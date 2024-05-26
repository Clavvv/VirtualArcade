'use client'
import React, { useState, useRef } from 'react';
import { EmulatorJS } from 'react-emulatorjs';

export default function Home() {
  const emulatorArray = ["Gameboy", "Gameboy Adv", "Nintendo DS"];
  const emulatorMap = {
    "Gameboy": "gb",
    "Gameboy Adv": "gba",
    "Nintendo DS": "nds",
  };

  const gameRef = useRef(null);
  const [rom, setRom] = useState("");
  const [activeEmulator, setActiveEmulator] = useState(emulatorArray[0]);
  const [fileError, setFileError] = useState(null)

  const verifyRomFileType = (file) => {

    if (file) {

      const extension = file.name.split('.').pop()

      if (extension !== emulatorMap[activeEmulator]) {
        setFileError("invalid file type")
        return false
      }

      setFileError(null)
      return true
    }


  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newURL = URL.createObjectURL(file);
      setRom(newURL);
    }
  };

  const handleButtonClick = () => {
    gameRef.current.click();
  };

  const handleEmulatorChangeRight = (e) => {
    e.preventDefault();
    const current = emulatorArray.indexOf(activeEmulator);
    const next = (current + 1) % emulatorArray.length;
    setActiveEmulator(emulatorArray[next]);
  };

  const handleEmulatorChangeLeft = (e) => {
    e.preventDefault();
    const current = emulatorArray.indexOf(activeEmulator);
    const next = (current - 1 + emulatorArray.length) % emulatorArray.length;
    setActiveEmulator(emulatorArray[next]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-neon">
      <div className="flex flex-row items-center">
        <button
          className="cyber-button mx-5"
          onClick={handleEmulatorChangeLeft}
        >
          &lt;
        </button>
        <span className="text-center text-neon-pink text-4xl font-bold min-w-[250px]">
          {activeEmulator}
        </span>
        <button className="cyber-button mx-5" onClick={handleEmulatorChangeRight}>
          {">"}
        </button>
      </div >

      <div className="relative flex justify-center items-center w-full h-full mb-10">
        <div className="relative w-full xl:max-w-4xl">
          <img src="/images/tv.png" className="block w-full h-auto" />
          <div className="absolute inset-0 flex justify-center items-center" style={{ left: '-18%' }}>
            {rom && (
              <EmulatorJS
                className="w-[70%] h-[70%]"
                EJS_core={emulatorMap[activeEmulator]}
                EJS_gameUrl={rom}
              />
            )}
          </div>
          {fileError && <span className="text-sm text-red-600 font-light">{fileError}</span>}
        </div>
      </div>

      <div className="flex flex-row justify-center mt-5 p-3">
        <input className="hidden" type="file" ref={gameRef} onChange={handleFileUpload} />
        <button className="cyber-button" onClick={handleButtonClick}>
          Load Rom
        </button>
      </div>
    </main>
  );
}
