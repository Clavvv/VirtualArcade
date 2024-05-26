'use client'
import React, { useState, useRef } from 'react';
import { EmulatorJS } from 'react-emulatorjs';

export default function Home() {
  const emulatorArray = ["Game Boy", "Game Boy Advance", "Nintendo DS"];
  const emulatorMap = {
    "Gameboy": "gb",
    "Gameboy Adv": "gba",
    "Nintendo DS": "nds"
  };

  const gameRef = useRef(null);
  const [rom, setRom] = useState("");
  const [activeEmulator, setActiveEmulator] = useState(emulatorArray[0]);
  const [fileError, setFileError] = useState(null);

  const verifyRomFileType = (file) => {
    if (file) {
      const extension = file.name.split('.').pop();
      if (extension !== emulatorMap[activeEmulator]) {
        setFileError("Invalid file type");
        return false;
      }
      setFileError(null);
      return true;
    }
    return false;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && verifyRomFileType(file)) {
      const newURL = URL.createObjectURL(file);
      setRom(newURL);
    }
  };

  const handleButtonClick = () => {
    gameRef.current.click();
  };

  const handleEmulatorChange = (direction) => {
    const current = emulatorArray.indexOf(activeEmulator);
    const next = (current + direction + emulatorArray.length) % emulatorArray.length;
    setActiveEmulator(emulatorArray[next]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-neon">
      <div className="flex flex-row items-center">
        <button 
          className="cyber-button mx-5" 
          onClick={() => handleEmulatorChange(-1)}
        >
          &lt;
        </button>
        <span className="text-center text-neon-pink text-4xl font-bold min-w-[250px]">
          {activeEmulator}
        </span>
        <button 
          className="cyber-button mx-5" 
          onClick={() => handleEmulatorChange(1)}
        >
          &gt;
        </button>
      </div>
      <div className="flex flex-col h-full w-full">
        <div className="flex justify-center">
          {rom && <EmulatorJS className="justify-center" EJS_core={emulatorMap[activeEmulator]} EJS_gameUrl={rom} />}
        </div>
        {fileError && <span className="text-sm text-red-600 font-light">{fileError}</span>}
        <div className="flex flex-row justify-center mt-5 p-3">
          <input className="hidden" type="file" ref={gameRef} onChange={handleFileUpload} />
          <button className="cyber-button" onClick={handleButtonClick}>
            Load Rom
          </button>
        </div>
      </div>
    </main>
  );
}
