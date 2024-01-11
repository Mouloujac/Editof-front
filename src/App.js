// App.js
import React, { useState } from 'react';
import Crop from './components/Crop/Crop.js';
import FileSelect from './components/FileSelect/FileSelect.js';
import Edit from './components/Edit/Edit.js';

function App() {
    const [imgSrc, setImgSrc] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    
    function onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                setSelectedImage(reader.result?.toString() || "")
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    function onCropChange() {
        
        if(!!selectedImage){
            setImgSrc(selectedImage);
            setSelectedImage(null);
            
        }else{
            setSelectedImage(imgSrc);
            setImgSrc(null);
        }
        

    }

    return (
        <div className="App">
            <header className="App-header">
                <FileSelect onCropChange={onCropChange} onSelectFile={onSelectFile} />
                {!!imgSrc && (
                    <Crop onCropChange={onCropChange} imgSrc={imgSrc} setImgSrc={setImgSrc} selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
                )}
                {selectedImage && (
                    <div>
                        <Edit selectedImage={selectedImage} setSelectedImage={setSelectedImage} onCropChange={onCropChange} />
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;
