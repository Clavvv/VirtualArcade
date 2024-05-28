import React, { useState, useRef, useEffect } from "react";
import { EmulatorJS } from 'react-emulatorjs';
import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from '@clerk/clerk-react';


const Home = (props) => {
    const { user } = useUser()
    const emulatorArray = ["Game Boy", "Game Boy Advance", "Nintendo DS"];
    const emulatorMap = {
      "Game Boy": "gb",
      "Game Boy Advance": "gba",
      "Nintendo DS": "nds",
    };
  
    const gameRef = useRef(null);
    const [rom, setRom] = useState("");
    const [activeEmulator, setActiveEmulator] = useState(emulatorArray[0]);
    const [activeKeys, setActiveKeys] = useState({});
    const [fileError, setFileError] = useState("");
    const [showLegend, setShowLegend] = useState(false); // State for showing/hiding legend
    const [iframeRef, setIframeRef] = useState(null);
  
    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const newURL = URL.createObjectURL(file);
        setRom(newURL);
        setFileError("");
      } else {
        setFileError("Failed to load ROM file refresh the page and try again.");
      }
    };
  
    const handleButtonClick = () => {
      gameRef.current.click();
    };
  
    const handleEmulatorChangeRight = () => {
      const current = emulatorArray.indexOf(activeEmulator);
      const next = (current + 1) % emulatorArray.length;
      setActiveEmulator(emulatorArray[next]);
    };
  
    const handleEmulatorChangeLeft = () => {
      const current = emulatorArray.indexOf(activeEmulator);
      const next = (current - 1 + emulatorArray.length) % emulatorArray.length;
      setActiveEmulator(emulatorArray[next]);
    };
  
    const handleKeyDown = (e) => {
      const key = e.key || e.data.key
      setActiveKeys((prevKeys) => ({ ...prevKeys, [key]: true }));
    };
  
    const handleKeyUp = (e) => {
      const key = e.key || e.data.key
      setActiveKeys((prevKeys) => ({ ...prevKeys, [key]: false }));
    };
  
    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }, []);
  
    const handleButtonPress = (key) => {
      setActiveKeys((prevKeys) => ({ ...prevKeys, [key]: true }));
    };
  
    const handleButtonRelease = (key) => {
      setActiveKeys((prevKeys) => ({ ...prevKeys, [key]: false }));
    };
  
    useEffect(() => {
      const findIframe = () => {
        const iframe = document.querySelector("iframe");
        if (iframe) {
          setIframeRef(iframe);
        }
      };
  
      findIframe();
    }, [rom])
  
    useEffect(() => {
      const handleIframeInput = (e) => {
        if (e.origin !== new URL(iframeRef.src).origin) {
          return;
        }
  
        const { type, key } = e.data
  
        if (type === 'keydown') {
          handleKeyDown({ key })
        } else if (type === 'keyup') {
          handleKeyUp({ key })
        }
      }
  
      window.addEventListener('message', handleIframeInput)
  
      return () => {
        window.removeEventListener('message', handleIframeInput)
      }
    }, [iframeRef])



    return (
        <div className="mainContainer">
          {/* The children of the SignedOut component are rendered only when the user is signed out from the app. In this case, the app will render a SignInButton */}
          <SignedOut>
          <div className={'titleContainer'}>
            <div className='title text-red-600'>GameBeav</div>
          </div>
          <div className="mb-10 text-neon-pink drop-shadow-none text-lg">A retro themed Nintendo emulator</div>
            <SignInButton>
              <input className="cyber-button m-10" type="button" value={'Sign In'} />
            </SignInButton>
          </SignedOut>
    
          {/* The children of the SignedIn component are rendered only when the user is signed in. In this case, the app will render the SignOutButton */}
          <SignedIn>
          <div className={'titleContainer'}>
            <div className='title text-neon-green mb-5'>GameBeav</div>
          </div>
          <div className="flex flex-row items-center">
        <button
          className="cyber-button mx-5 active:bg-slate-600"
          onClick={handleEmulatorChangeLeft}
        >
          &lt;
        </button>
        <span className="text-center text-neon-pink text-4xl font-bold min-w-[250px]">
          {activeEmulator}
        </span>
        <button
          className="cyber-button mx-5 active:bg-slate-600"
          onClick={handleEmulatorChangeRight}
        >
          &gt;
        </button>
      </div>

      <div className="flex flex-col h-full w-full items-center mt-20" style={{ minWidth: '900px', maxWidth: '900px' }}>
        <div className="relative w-full xl:max-w-4xl mb-10" style={{ minHeight: '600px' }}>
          <div className="relative w-full h-full">
            <img src="/images/tv.png" className="block w-full h-auto" />
            <div className="absolute w-10/12" style={{ left: '6%', top: '10%' }}>
              <img src="/images/animated-tv-static.gif" className="object-fill h-auto w-5/6 z-0" />
            </div>
          </div>

          <div className="absolute flex justify-center items-center z-10" style={{ left: '5%', bottom: '9%' }}>
            {rom && (
              <EmulatorJS
                EJS_core={emulatorMap[activeEmulator]}
                EJS_gameUrl={rom}
              />
            )}
          </div>
        </div>

        {fileError && (
          <span className="text-sm text-red-600 font-light">{fileError}</span>
        )}

        <div className="flex flex-row justify-center mt-5 p-3">
          <input
            className="hidden"
            type="file"
            ref={gameRef}
            onChange={handleFileUpload}
          />
          <button className="cyber-button active:bg-slate-600" onClick={handleButtonClick}>
            Load ROM
          </button>
        </div>

        <div className="controller flex w-full mt-10 mr-20" style={{ maxWidth: '1600px', minWidth: '1300px' }}>
          <div className="controller-buttons-left flex flex-col items-center">
            <div
              className={`controller-button ${activeKeys['ArrowUp'] ? 'controller-button-active' : ''}`}
              onMouseDown={() => handleButtonPress('ArrowUp')}
              onMouseUp={() => handleButtonRelease('ArrowUp')}
            >
              ↑
            </div>
            <div className="flex">
              <div
                className={`controller-button ${activeKeys['ArrowLeft'] ? 'controller-button-active' : ''}`}
                onMouseDown={() => handleButtonPress('ArrowLeft')}
                onMouseUp={() => handleButtonRelease('ArrowLeft')}
              >
                ←
              </div>
              <div
                className={`controller-button ${activeKeys['ArrowDown'] ? 'controller-button-active' : ''}`}
                onMouseDown={() => handleButtonPress('ArrowDown')}
                onMouseUp={() => handleButtonRelease('ArrowDown')}
              >
                ↓
              </div>
              <div
                className={`controller-button ${activeKeys['ArrowRight'] ? 'controller-button-active' : ''}`}
                onMouseDown={() => handleButtonPress('ArrowRight')}
                onMouseUp={() => handleButtonRelease('ArrowRight')}
              >
                →
              </div>
            </div>
          </div>

          <div className="controller-buttons-right flex flex-col items-center">
            <div className="flex">
              <div
                className={`controller-button ${activeKeys['a'] ? 'controller-button-active' : ''}`}
                onMouseDown={() => handleButtonPress('a')}
                onMouseUp={() => handleButtonRelease('a')}
              >
                X
              </div>
              <div
                className={`controller-button ${activeKeys['s'] ? 'controller-button-active' : ''}`}
                onMouseDown={() => handleButtonPress('s')}
                onMouseUp={() => handleButtonRelease('s')}
              >
                Y
              </div>
            </div>
            <div className="flex">
              <div
                className={`controller-button ${activeKeys['z'] ? 'controller-button-active' : ''}`}
                onMouseDown={() => handleButtonPress('z')}
                onMouseUp={() => handleButtonRelease('z')}
              >
                B
              </div>
              <div
                className={`controller-button ${activeKeys['x'] ? 'controller-button-active' : ''}`}
                onMouseDown={() => handleButtonPress('x')}
                onMouseUp={() => handleButtonRelease('x')}
              >
                A
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-5 left-5 z-50" >
          <button className="retro-button" onClick={() => setShowLegend(!showLegend)}>
            {showLegend ? "Hide Key Mappings" : "Show Key Mappings"}
          </button>
        </div>

        {showLegend && (
          <div className="keymappings mt-10">
            <table>
              <thead>
                <tr>
                  <th>Emulator Key</th>
                  <th>Keyboard Key</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Up Arrow</td>
                  <td>&uarr;</td>
                </tr>
                <tr>
                  <td>Left Arrow</td>
                  <td>&larr;</td>
                </tr>
                <tr>
                  <td>Right Arrow</td>
                  <td>&rarr;</td>
                </tr>
                <tr>
                  <td>Down Arrow</td>
                  <td>&darr;</td>
                </tr>
                <tr>
                  <td>A button</td>
                  <td>Z</td>
                </tr>
                <tr>
                  <td>B button</td>
                  <td>X</td>
                </tr>
                <tr>
                  <td>Y button</td>
                  <td>S</td>
                </tr>
                <tr>
                  <td>X button</td>
                  <td>A</td>
                </tr>
                <tr>
                  <td>Start</td>
                  <td>Enter</td>
                </tr>
                <tr>
                  <td>Select</td>
                  <td>V</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
            <SignOutButton>
              <input className="cyber-button" type="button" value={'Sign Out'} />
            </SignOutButton>
          </SignedIn>
    
          {/* You can also check if a user is logged in or not using the 'user' object from the useUser hook. In this case, a non-undefined user object will render the user's email on the page */}
          {user ? <div className="text-neon-green2 mt-10">Your email address is {user.primaryEmailAddress.emailAddress}</div> : null}
        </div>
      )
    }
    
    export default Home