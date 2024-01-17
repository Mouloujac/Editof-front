// FileSelect.js
import React from "react";

export default function FileSelect({ onSelectFile, onFileDrop }) {

    const handleDrop = (e) => {
        e.preventDefault();
        onFileDrop(e);
    };

    return (
        <div 
            className="FileSelect" 
            onDrop={handleDrop} 
            onDragOver={(e) => e.preventDefault()}
        >
            <input 
                type="file" 
                accept="image/*" 
                onChange={onSelectFile} 
                id="fileSelect" 
                onDrop={handleDrop}
            />
            <p>Drag & Drop or Click to select a file</p>
        </div>
    );
}
