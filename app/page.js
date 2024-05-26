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
    <main className="flex min-h-screen flex-col items-center justify-between pt-12 pb-24 bg-gray-900">
      <div className="flex flex-row mb-10">
        <button className="text-pink-300/80 text-4xl font-bold mx-5 px-2 hover:bg-slate-50 hover:rounded-sm" onClick={handleEmulatorChangeLeft}>
          {"<"}
        </button>
        <span className="text-center text-pink-300/80 text-4xl font-bold min-w-[250px]">
          {activeEmulator}
        </span>
        <button className="text-pink-300/80 text-4xl font-bold mx-5 px-2 hover:bg-slate-50 hover:rounded-sm" onClick={handleEmulatorChangeRight}>
          {">"}
        </button>
      </div>

      <div className="relative flex justify-center items-center w-full h-full mb-10">
        <div className="relative max-w-full max-h-full">
          <img src="/images/tv.png" alt="TV" className="block max-w-full max-h-full" />
          <div className="absolute inset-0 flex justify-center items-center">
            {(
              <EmulatorJS
                className="w-[70%] h-[70%]"
                EJS_core={emulatorMap[activeEmulator]}
                EJS_gameUrl={rom}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center mt-5 p-3">
        <input className="hidden" type="file" ref={gameRef} onChange={handleFileUpload} />
        <button className="bg-slate-600 border border-pink-400 rounded-md justify-center align-center p-2" onClick={handleButtonClick}>
          Load Rom
        </button>
      </div>
    </main>
  );
}
