'use client'
import React, { useState, useRef } from 'react';
import { EmulatorJS } from 'react-emulatorjs';

export default function Home() {
  const emulatorArray = ["Game Boy", "Game Boy Advance", "Nintendo DS"];
  const emulatorMap = {
    "Game Boy": "gb",
    "Game Boy Advance": "gba",
    "Nintendo DS": "nds"
  };

  const gameRef = useRef(null);
  const [rom, setRom] = useState("");
  const [activeEmulator, setActiveEmulator] = useState(emulatorArray[0]);

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
        <button 
          className="cyber-button mx-5" 
          onClick={handleEmulatorChangeRight}
        >
          &gt;
        </button>
      </div>
      <div className="flex flex-col h-full w-full">
        <div className="flex justify-center">
          {rom && <EmulatorJS className="justify-center" EJS_core={emulatorMap[activeEmulator]} EJS_gameUrl={rom} />}
        </div>
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
