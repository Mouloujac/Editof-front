// App.js
import React, { useState } from 'react';
import Crop from './components/Crop/Crop.js';
import FileSelect from './components/FileSelect/FileSelect.js';


function App() {
    const [imgSrc, setImgSrc] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileName, setFileName] = useState("")
    
    function onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                setImgSrc(reader.result?.toString() || "")
            );
            reader.readAsDataURL(e.target.files[0]);
            
        }
        
        const fileInput = document.getElementById('fileSelect');
            
        if (fileInput.files.length > 0) {
            const uploadedFile = fileInput.files[0];
            const fileName = uploadedFile.name;
            setFileName(`${fileName.replace(/\.[^/.]+$/, '')}_modified.jpg`)
            console.log('Nom du fichier:', fileName);
        } else {
            console.log('Aucun fichier sélectionné.');
        }
        
    }


    return (
        <div className="App">
            <header className="App-header">
                <FileSelect onSelectFile={onSelectFile} />
                {!!imgSrc && (
                    <Crop  imgSrc={imgSrc} setImgSrc={setImgSrc} selectedImage={selectedImage} setSelectedImage={setSelectedImage} fileName={fileName}/>
                )}
                
            </header>
        </div>
    );
}

export default App;
