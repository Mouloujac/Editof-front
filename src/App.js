// App.js
import React, { useState } from 'react';
import CropImage from './components/Crop/CropImage.js';
import FileSelect from './components/FileSelect/FileSelect.js';

function App() {
    const [imgSrc, setImgSrc] = useState("");
    const [isSelectVisible, setIsSelectVisible] = useState(true)
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileName, setFileName] = useState("");
    

    function onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            setImgSrc()
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                setImgSrc(reader.result?.toString() || "")
            );
            reader.readAsDataURL(e.target.files[0]);
            
            const uploadedFile = e.target.files[0];
            const fileName = uploadedFile.name;
            setFileName(`${fileName.replace(/\.[^/.]+$/, '')}_modified.jpg`)
            setIsSelectVisible(false)
        }
        
    }

    function handleFileDrop(e) {
        if (e.dataTransfer.files.length > 0) {
            setImgSrc()
            const droppedFile = e.dataTransfer.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                setImgSrc(reader.result?.toString() || "")
            );
            reader.readAsDataURL(droppedFile);
            
            const fileName = droppedFile.name;
            setFileName(`${fileName.replace(/\.[^/.]+$/, '')}_modified.jpg`)
            setIsSelectVisible(false)
        }
    }

    return (
        <div className="App">
            <header className="App-header">
            {isSelectVisible && (
                <FileSelect onSelectFile={onSelectFile} onFileDrop={handleFileDrop}  />
            )}
                {!!imgSrc && (
                    <CropImage  imgSrc={imgSrc} setImgSrc={setImgSrc} isSelectVisible={isSelectVisible} setIsSelectVisible={setIsSelectVisible} selectedImage={selectedImage} setSelectedImage={setSelectedImage} fileName={fileName}/>
                )}
            </header>
        </div>
    );
}

export default App;
