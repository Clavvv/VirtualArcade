'use client'
import React, { useState, useRef, useEffect } from 'react';
import { EmulatorJS } from 'react-emulatorjs';

export default function Home() {
  const gameRef = useRef(null);
  const [rom, setRom] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0]

    if (file) {
      const newURL= URL.createObjectURL(file);
      setRom(newURL);
    }
  };

  useEffect(() => {
  }, [rom]);

  const handleButtonClick = () => {
    gameRef.current.click();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-pink-300/80 text-4xl font-bold">
        This is the emulator test page
      </div>

      <div>
        <div>
          {rom && <EmulatorJS EJS_core="gb" EJS_gameUrl={rom} />}
        </div>

        <input className="hidden" type="file" ref={gameRef} onChange={handleFileUpload} />

        <button className="bg-slate-600 border border-pink-400 rounded-md" onClick={handleButtonClick}>
          Load Rom
        </button>
      </div>
    </main>
  );
}



