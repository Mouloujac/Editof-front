import React, { useRef } from "react";

export default function FileSelect({ onSelectFile, onFileDrop }) {
    const inputRef = useRef(null);

    const handleDrop = (e) => {
        e.preventDefault();
        onFileDrop(e);
    };

    const handleButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <div 
            className="FileSelect desktop:bg-neutral-700 text-white desktop:px-44 desktop:py-24 desktop:w-fit desktop:rounded-lg flex flex-col self-center justify-center desktop:border-dashed desktop:border-white desktop:border-2 desktop:hover:bg-neutral-600" 
            onDrop={handleDrop} 
            onDragOver={(e) => e.preventDefault()}
        >
            <button 
                onClick={handleButtonClick}
                className='bg-blue-500 hover:bg-blue-600 p-2 flex text-white space-x-1 w-36 justify-center self-center mb-2'
            ><img src="file-search.svg" alt='fileSearch' className="pr-1"></img>Choose File</button>
            
            <div className="hidden">
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={onSelectFile} 
                    id="fileInput" 
                    onDrop={handleDrop}
                    className=""
                    ref={inputRef}
                />
            </div>
            <p className="md:hidden">Drag & Drop or Click to select a file</p>
        </div>
    );
}
