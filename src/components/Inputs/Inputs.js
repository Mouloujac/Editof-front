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
    makeChanges,
}) {

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Fonction qui sera appelée à chaque changement sur une checkbox
    function handleCheckboxChange(event) {
    // Si la checkbox actuelle est cochée
    if (event.target.checked) {
        // Parcourt toutes les checkboxes
        checkboxes.forEach((checkbox) => {
        // Sauf la checkbox actuelle, décoche les autres
        if (checkbox !== event.target) {
            checkbox.checked = false;
        }
        });
    }
    }

    // Ajoute l'événement "change" à toutes les checkboxes
    checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange);
    });
    
    
    return (
        <section className="md:container md:absolute md:h-full  inputSection text-left flex ">
            
            <div className="Crop-Controls px-3 h-full md:h-44 md:py-8 md:absolute md:bottom-2 md:z-50 md:justify-evenly md:w-full md:flex md:flex desktop:space-y-0 text-white">
            
                <div className="md:flex">
                    <input unchecked type="checkbox" id="mirrorCheck" className="peer appearance-none z-50 sm:w-12 sm:h-12 "></input><img className="md:absolute md:w-10 md:ml-[0.2rem] md:mt-[0.3rem] desktop:hidden" src="mirrorIcon.svg"></img>
                    
                    <container className="container md:m-auto md:w-48 md:peer-checked:flex md:peer-checked:absolute md:bottom-44 md:left-[23.5%] md:peer-checked:absolute sm:hidden  2xl:relative z-50 desktop:flex flex-col space-y-3 bg-neutral-800 p-4 rounded-lg ">
                        <label htmlFor="rotate-input " className="text-white">Mirroring:</label>
                        <span className="bg-neutral-600 h-0.5"></span>
                        <label className="relative inline-flex items-center cursor-pointer mt-5">
                            <input onClick={() => mirroringImageY()} type="checkbox" value="" className="sr-only peer"  id="mirrorInputY"/>
                            <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium  text-white"><p>Toggle Y</p></span>
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onClick={() => mirroringImageX()} type="checkbox" value="" className="sr-only peer" id="mirrorInputX"/>
                            <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium  text-white"><p>Toggle X</p></span>
                        </label>
                    </container>
                </div>
                <div className="md:flex">
                    <input unchecked type="checkbox" id="mirrorCheck" className="peer appearance-none sm:w-12 sm:h-12 z-50"></input><img className="md:absolute md:w-10 md:ml-[0.2rem] md:mt-[0.3rem] desktop:hidden" src="rotateIcon.svg"></img>
                    <div className="container md:m-auto md:w-48 md:peer-checked:flex md:peer-checked:absolute md:bottom-44 md:left-[23.5%] md:peer-checked:absolute sm:hidden  lg:flex flex-col bg-neutral-800 space-y-3 p-4 rounded-lg">
                        <label htmlFor="rotate-input" className=""><p>Rotate:</p> </label>
                        <input
                            className="text-black rounded-sm"
                            id="rotate-input"
                            type="number"
                            value={rotate}
                            disabled={!imgSrc}
                            onChange={(e) =>
                            setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))}
                        />
                    </div>
                </div>
                <div className="md:flex">
                <input unchecked type="checkbox" id="mirrorCheck" className="peer appearance-none sm:w-12 sm:h-12 z-50"></input><img className="md:absolute md:w-10 md:ml-[0.2rem] md:mt-[0.3rem] desktop:hidden" src="zoomIcon.svg"></img>
                    <div className="container md:m-auto md:w-48 md:peer-checked:flex md:peer-checked:absolute md:bottom-44 md:left-[23.5%] md:peer-checked:absolute sm:hidden  lg:flex bg-neutral-800 p-4 rounded-lg flex flex-col">
                        <div className="flex flex-row justify-between">

                            <label htmlFor="scale-input" className="pb-2"><p>Scale:</p> </label>
                            <output className="ml-4 text-gray-200" for="scale-input" id="rangeValue">{scale.toFixed(1)}</output>

                        </div>

                        <input
                        id="scale-input"
                        type="range"
                        step="1"
                        value={scale}
                        disabled={!imgSrc}
                        onChange={(e) => setScale(Number(e.target.value))}
                        min='1'
                        />
                        
                    </div>
                </div>
                <div className="md:flex">
                <input unchecked type="checkbox" id="mirrorCheck" className="peer appearance-none sm:w-12 sm:h-12 z-50"></input><img className="md:absolute md:w-10 md:ml-[0.2rem] md:mt-[0.3rem] desktop:hidden" src="colorIcon.svg"></img>
                    <div className="container md:m-auto md:w-48 md:peer-checked:flex md:peer-checked:absolute md:bottom-44 md:left-[23.5%] md:peer-checked:absolute sm:hidden desktop:flex flex-col space-y-3 bg-neutral-800 p-4 rounded-lg">
                        <label htmlFor="scale-input"><p>Color change:</p> </label>
                        <span className="bg-neutral-600 h-0.5 mb-2"></span>

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
                </div>  
                <div className="md:flex">
                <input unchecked type="checkbox" id="mirrorCheck" className="peer appearance-none sm:w-12 sm:h-12 z-50"></input><img className="md:absolute md:w-10 md:ml-[0.2rem] md:mt-[0.3rem] desktop:hidden" src="cardeIcon.svg"></img>
                    <div className="container md:m-auto md:w-48 md:peer-checked:flex md:peer-checked:absolute md:bottom-44 md:left-[23.5%] md:peer-checked:absolute sm:hidden  desktop:flex flex-col bg-neutral-800 p-4 rounded-lg">
                        <label htmlFor="aspectSelect" className="pb-2"><p>Aspect Ratio:</p></label>
                        <select
                            className="text-black rounded-sm"
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
                 
            </div>
            
        </section>
    );
}
