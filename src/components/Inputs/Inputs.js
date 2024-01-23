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
            <div className="Crop-Controls p-3 h-full flex flex-col space-y-8">
                <div className="flex flex-col space-y-3">
                    <label htmlFor="rotate-input">Mirroring: </label>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input onClick={() => mirroringImageY()} type="checkbox" value="" class="sr-only peer"  id="mirrorInputY"/>
                        <div class="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle Y</span>
                    </label>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input onClick={() => mirroringImageX()} type="checkbox" value="" class="sr-only peer" id="mirrorInputX"/>
                        <div class="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle X</span>
                    </label>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="rotate-input">Rotate: </label>
                    <input
                        id="rotate-input"
                        type="number"
                        value={rotate}
                        disabled={!imgSrc}
                        onChange={(e) =>
                        setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))}
                    />
                </div>
                <div>
                    <label htmlFor="scale-input">Scale: </label>
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
                <div className="flex flex-col space-y-3">
                <label htmlFor="scale-input">Color change: </label>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input onClick={() => toggleSepia()} type="checkbox" value="" class="sr-only peer" id="sepiaCheck"/>
                        <div class="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle Sepia</span>
                    </label>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input onClick={() => toggleBlackAndWhite()} type="checkbox" value="" class="sr-only peer" id="b&wCheck"/>
                        <div class="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle B&W</span>
                    </label>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="aspectSelect">Aspect Ratio:</label>
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
