'use client'
import React, { useState, useRef, useEffect } from 'react';
import { EmulatorJS } from 'react-emulatorjs';

export default function Home() {
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
    setActiveKeys((prevKeys) => ({ ...prevKeys, [e.key]: true }));
  };

  const handleKeyUp = (e) => {
    setActiveKeys((prevKeys) => ({ ...prevKeys, [e.key]: false }));
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

  return (
    <main className="flex h-screen flex-col items-center justify-between p-24 bg-neon">
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
        <div className="relative w-full xl:max-w-4xl mb-10" style={{ minHeight: '400px' }}>
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
          <div className="instructions absolute inset-x-50 bottom-5 bg-zinc-900/[0.5] p-4 m-20 rounded-md border-2 border-[#00ff99] ">
            This emulator supports .gb, .gba, and .nds ROM files. Please use the selector at the top of the page to choose your preferred emulator. Enjoy!
          </div>
        </div>

        <div className="controller flex w-full mt-10 mr-20" style={{ maxWidth: '1600px', minWidth: '1300px' }}>
          <div className="controller-buttons-left flex flex-col items-center" >
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
<<<<<<< HEAD
                className={`controller-button ${activeKeys['a'] ? 'controller-button-active' : ''
                  }`}
=======
                className={`controller-button ${activeKeys['a'] ? 'controller-button-active' : ''}`}
>>>>>>> ac846b5c6de9c4df25c6c45bea748c2c3077645d
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

<<<<<<< HEAD
        <div className="keymappings absolute top-0 left-0 m-10 space-y-10">
          <table>
            <thead>
              <tr>
                <th className="px-5">Emulator Key</th>
                <th className="px-5">Keyboard Key</th>
              </tr>
            </thead>
            <tbody className="mt-5">
              <tr>
                <td className="px-5">Up Arrow</td>
                <td className="px-5">&uarr;</td>
              </tr>
              <tr>
                <td className="px-5">Left Arrow</td>
                <td className="px-5">&larr;</td>
              </tr>
              <tr>
                <td className="px-5">Right Arrow</td>
                <td className="px-5">&rarr;</td>
              </tr>
              <tr>
                <td className="px-5">Down Arrow</td>
                <td className="px-5">&darr;</td>
              </tr>
              <tr>
                <td className="px-5">A button</td>
                <td className="px-5">Z</td>
              </tr>
              <tr>
                <td className="px-5">B button</td>
                <td className="px-5">X</td>
              </tr>
              <tr>
                <td className="px-5">Y button</td>
                <td className="px-5">S</td>
              </tr>
              <tr>
                <td className="px-5">X button</td>
                <td className="px-5">A</td>
              </tr>
              <tr>
                <td className="px-5">Start</td>
                <td className="px-5">Enter</td>
              </tr>
              <tr>
                <td className="px-5">Select</td>
                <td className="px-5">V</td>
              </tr>
            </tbody>
          </table>
        </div>
=======
>>>>>>> ac846b5c6de9c4df25c6c45bea748c2c3077645d
      </div>
    </main >
  );
}
