'use client'
import React, { useState, useRef, useEffect } from 'react';
import { EmulatorJS } from 'react-emulatorjs';

export default function Home() {
  const emulatorArray= ["Gameboy", "Gameboy Adv", "Nintendo DS"]
  const emulatorMap= {
    "Gameboy": "gb",
    "Gameboy Adv": "gba",
    "Nintendo DS": "nds"
  }


  const gameRef = useRef(null)
  const [rom, setRom] = useState("")
  const [activeEmulator, setActiveEmulator] = useState(emulatorArray[0])
  const [fileError, setFileError] = useState(null)

  const verifyRomFileType = (file) => {

      if (file) {

        const extension= file.name.split('.').pop()

        if (extension !== emulatorMap[activeEmulator]) {
          setFileError("invalid file type")
          return false
        }
        
        setFileError(null)
        return true
      }


  }


  const handleFileUpload = (e) => {
    const file = e.target.files[0]

    if (file) {

      if (verifyRomFileType(file)) {
        setFileError(null)
        const newURL = URL.createObjectURL(file);
        setRom(newURL)
    }
    }
  }

  const handleButtonClick = () => {
    gameRef.current.click();
  }

  const handleEmulatorChangeRight = (e) => {

    e.preventDefault()
    const current= emulatorArray.indexOf(activeEmulator)
    const next= (current + 1) % emulatorArray.length
    setActiveEmulator(emulatorArray[next])
  }

  const handleEmulatorChangeLeft = (e) => {
      
      e.preventDefault()
      const current= emulatorArray.indexOf(activeEmulator)
      const next = (current - 1 + emulatorArray.length) % emulatorArray.length
      setActiveEmulator(emulatorArray[next])
  
    }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-row">
        <button className="text-pink-300/80 text-4xl font-bold mx-5 px-2 hover:bg-slate-50 hover:rounded-sm" onClick= {handleEmulatorChangeLeft}>
          {/*need to replace these with actual arrow SVG values or something.*/}
          {"<"}
        </button>
        <span className="text-center text-pink-300/80 text-4xl font-bold min-w-[250px]">
          {activeEmulator}
        </span>
        <button className="text-pink-300/80 text-4xl font-bold mx-5 px-2 hover:bg-slate-50 hover:rounded-sm" onClick= {handleEmulatorChangeRight}>
          {">"}
        </button>
      </div>
      <div className="flex flex-col h-full w-full">
        <div className="flex justify-center">
          {rom && <EmulatorJS className="justify-center" EJS_core={emulatorMap[activeEmulator]} EJS_gameUrl={rom} />}
        </div>
        {fileError && <span className="text-sm text-red-600 font-light">{fileError}</span>}
        <div className="flex flex-row justify-center mt-5 p-3">
          <input className="hidden" type="file" ref={gameRef} onChange={handleFileUpload} />
          <button className="bg-slate-600 border border-pink-400 rounded-md justify-center align-center" onClick={handleButtonClick}>
            Load Rom
          </button>
        </div>
      </div>
    </main>
  );
}



