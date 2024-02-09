// App.js
import "./App.css";

import React, { useState, useEffect } from 'react';
import CropImage from './components/Crop/CropImage.js';
import FileSelect from './components/FileSelect/FileSelect.js';
import Title from './components/Title/Title.js';
import TitleCrop from './components/Title/TitleCrop.js';
import Loader from './components/Loader/Loader.js';
import "./Fonts/Nunito-VariableFont_wght.ttf"
import "./Fonts/Syne-VariableFont_wght.ttf"

function App() {
  const [isLoading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState("");
  const [isSelectVisible, setIsSelectVisible] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [load, setLoad] = useState(false);
  

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
            setSelectedImage("1")
            test()
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
    function someRequest() {
        return new Promise(resolve => setTimeout(() => resolve(), 2500));
    }
    
    useEffect(() => {
        someRequest().then(() => {
            setLoading(false);
        });
    }, []); 

    function test(){
        setLoad(true)
        someRequest().then(() => {
            console.log('useEffect')
        });
    };
  

    if (isLoading) {
        return (
            <div className="App">
            
            <Loader />
            </div>
        );
    }
    
      return (
        <div className="App flex h-screen bg-neutral-800 justify-center align-center flex-col h-full text-base">
          <header className="App-header">
            
          </header>
          
            {load && (
              <Loader />
            )}
          
          {isSelectVisible && (
            <section className='flex flex-col'>
              <Title />
              <FileSelect onSelectFile={onSelectFile} onFileDrop={handleFileDrop} />
            </section>
          )}
          
          {!!imgSrc && (
            <>
            
              <CropImage setLoad={setLoad} load={load} imgSrc={imgSrc} setImgSrc={setImgSrc} isSelectVisible={isSelectVisible} setIsSelectVisible={setIsSelectVisible} selectedImage={selectedImage} setSelectedImage={setSelectedImage} fileName={fileName} />
            </>
          )}
        </div>
      );
    }
    
    export default App;