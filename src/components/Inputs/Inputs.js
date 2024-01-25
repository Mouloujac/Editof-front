// FileSelect.js
import React, { useRef } from "react";

export default function Inputs({ 
    mirroringImageX,
    mirroringImageY,
    setMirrorX,
    rotate,
    imgSrc,
    setRotate,
    scale,
    setScale,
    toggleSepia,
    toggleBlackAndWhite,
    aspect,
    handleAspectChange,
    handleRotateChange,
    aspectOptions,
    newWidth,
    newHeight,
    mirrorY,
}) {

    
    
    
    return (
        <section className="inputSection">
            <div className="Crop-Controls px-3 h-full flex flex-col space-y-5 text-white">
                <div className="flex flex-col space-y-3 bg-neutral-800 p-4 rounded-lg ">
                    <label htmlFor="rotate-input " className="text-white"><p>Mirroring: </p></label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onClick={() => mirroringImageY()} type="checkbox" value="" className="sr-only peer"  id="mirrorInputY"/>
                        <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium  text-white"><p>Toggle Y</p></span>
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onClick={() => mirroringImageX()} type="checkbox" value="" className="sr-only peer" id="mirrorInputX"/>
                        <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium  text-white"><p>Toggle X</p></span>
                    </label>
                </div>
                <div className="flex flex-col bg-neutral-800 p-4 rounded-lg">
                    <label htmlFor="rotate-input" className="pb-2"><p>Rotate:</p> </label>
                    <input
                        id="rotate-input"
                        type="number"
                        value={rotate}
                        disabled={!imgSrc}
                        onChange={(e) =>
                        setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))}
                    />
                </div>
                <div className="bg-neutral-800 p-4 rounded-lg flex flex-col">
                    <label htmlFor="scale-input" className="pb-2"><p>Scale:</p> </label>
                    <input
                    
                    id="scale-input"
                    type="range"
                    step="0.1"
                        value={scale}
                    disabled={!imgSrc}
                        onChange={(e) => setScale(Number(e.target.value))}
                    min='1.0'
                    />
                    <span>{scale.toFixed(1)}</span> 
                </div>
                <div className="flex flex-col space-y-3 bg-neutral-800 p-4 rounded-lg">
                <label htmlFor="scale-input"><p>Color change:</p> </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onClick={() => toggleSepia()} type="checkbox" value="" className="sr-only peer" id="sepiaCheck"/>
                        <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium  "><p>Toggle Sepia</p></span>
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onClick={() => toggleBlackAndWhite()} type="checkbox" value="" className="sr-only peer" id="b&wCheck"/>
                        <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium  "><p>Toggle B&W</p></span>
                    </label>
                </div>
                <div className="flex flex-col bg-neutral-800 p-4 rounded-lg">
                    <label htmlFor="aspectSelect" className="pb-2"><p>Aspect Ratio:</p></label>
                    <select
                        id="aspectSelect"
                        value={aspect || ""}
                        onChange={(e) => handleAspectChange(parseFloat(e.target.value))}
                    >
                        
                        {aspectOptions.map((option) => (
                        <option key={option.label} value={option.value}>
                            {option.label}
                        </option>
                        ))}
                    </select>
                    
                </div>     
            </div>
        </section>
    );
}
