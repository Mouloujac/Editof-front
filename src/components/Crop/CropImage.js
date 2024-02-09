import React, { useState, useRef, useEffect } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";
import Inputs from "../Inputs/Inputs";
import axios from "axios";
import Loader from "../Loader/Loader";
import "./CropImage.css";
import Title from "../Title/Title";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 100,
        height: 100
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
  
}


export default function CropImage({selectedImage, onCropChange, imgSrc, setImgSrc, fileName, setIsSelectVisible, isSelectVisible, load, setLoad}) {
  
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const hiddenAnchorRef = useRef(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(undefined);
  const [isSepia, setIsSepia] = useState(false);
  const [isBlackAndWhite, setIsBlackAndWhite] = useState(false);
  const [baseWidth, setBaseWidth] = useState("")
  const [baseHeight, setBaseHeight] = useState("")
  const [newWidth, setNewWidth] = useState("")
  const [newHeight, setNewHeight] = useState("")
  const [mirrorX, setMirrorX] = useState("0")
  const [mirrorY, setMirrorY] = useState("0")
  const [scaleFlipX, setScaleFlipX] = useState(1)
  const [scaleFlipY, setScaleFlipY] = useState(1)
  const [cropLoading, setCropLoading] = useState(true);
  const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

  const exampleFunction = async () => {
    console.log('Start');
    await delay(4000);
    console.log('After 2 seconds');
    setLoad(false)
  };
  
  


  const toggleSepia = () => {
    
    setIsSepia(!isSepia);
    
    var x = document.getElementById("sepiaCheck").checked;
    document.getElementById("b&wCheck").checked = false;
    console.log("sepia:"+x)

  };

  const toggleBlackAndWhite = () => {
    setIsBlackAndWhite(!isBlackAndWhite);
    var x = document.getElementById("b&wCheck").checked;
    document.getElementById("sepiaCheck").checked = false;
    console.log("b&w:"+ x)
  };

  const imageStyle = {
    Width: "100%",
    filter: isSepia
      ? "sepia(1)"
      : isBlackAndWhite
      ? "grayscale(1)"
      : "none",
    transform: `scale(${scale}) scaleX(${scaleFlipX}) scaleY(${scaleFlipY}) rotate(${rotate}deg)`
  };

  const aspectOptions = [
    { label: "Libre", value: 100 },
    // { label: "Original", value: 1 },
    { label: "16:9", value: 16 / 9 },
    // { label: "1:1", value: 1 },
    { label: "4:3 (Moniteur)", value: 4 / 3 },
    { label: "3:4 (Profile)", value: 3 / 4 },
    { label: "14:9", value: 14 / 9 },
    { label: "16:9 (Ecran large)", value: 1 },
    { label: "9:16 (Story)", value: 9 / 16 },
    { label: "16:10", value: 16 / 10 },
    { label: "2:1", value: 2 / 1 },
    { label: "3:1 (Panoramique)", value: 3 / 1 },
    { label: "4:1", value: 4 / 1 },
    { label: "3:2 (Film 35mm)", value: 3 / 2 },
    { label: "5:4", value: 5 / 4 },
    { label: "7:5", value: 7 / 5 },
    { label: "19:10", value: 19 / 10 },
    { label: "21:9 (cinemascope)", value: 21 / 9 },
    { label: "32:9 (Super ultra grand)", value: 32 / 9 },
    { label: "Photo de couverture Facebook", value: 851 / 315 },
    
  ];

  function onImageLoad(e) {
    
    setBaseWidth(imgRef.current.naturalWidth)
    setBaseHeight(imgRef.current.naturalHeight)
   
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }else{
      setAspect(4/4)
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, undefined));
    }
    console.log(aspect)
    
    if (previewCanvasRef.current && completedCrop) {
      canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop,
        scale,
        rotate
      );
    }
    exampleFunction();
  
  }

  function defautInputs(){
    if(document.getElementById("b&wCheck").checked === true){
      document.getElementById("b&wCheck").checked = false;
      setIsBlackAndWhite(!isBlackAndWhite)
    }
    if(document.getElementById("sepiaCheck").checked === true){
      document.getElementById("sepiaCheck").checked = false;
      setIsSepia(!isSepia)
    }
    if(document.getElementById("mirrorInputY").checked === true){
      setMirrorY('0')
      setScaleFlipY(1)
      document.getElementById("mirrorInputY").checked = false;
      
    }
    if(document.getElementById("mirrorInputX").checked === true){
      setMirrorX('0')
      setScaleFlipX(1)
      document.getElementById("mirrorInputX").checked = false;
      
    }
    
  }

  useEffect(() =>{
    const image = imgRef.current;
    const { width, height } = imgRef.current;
    // console.log("manualheight="+manualHeight)
    // if (mirrorY === "1" && rotate !== 0) {
    //   setRotate(-rotate)
    // }
    if(crop){
      
      setNewWidth(Math.round((crop.width / 100) * baseWidth))
      setNewHeight(Math.round((crop.height / 100) * baseHeight))
    }
    setLoad(false)
  },[crop])

  
  
  

  function mirroringImageX() {
   if(mirrorY === "1" && mirrorX === "0"){
    console.log("2 activés")
    setScaleFlipX(-1)
    setScaleFlipY(-1)
    setMirrorX("1")
   }else if(mirrorY === "0" && mirrorX === "0"){
    console.log("Juste Y")
    setScaleFlipX(1)
    setScaleFlipY(-1)
    setMirrorX("1")
   }else if(mirrorY === "1" && mirrorX === "1"){
    console.log("Juste X")
    setScaleFlipX(-1)
    setScaleFlipY(1)
    setMirrorX("0")
  }else{
    console.log("Retour normal")
    setScaleFlipX(1)
    setScaleFlipY(1)
    setMirrorX("0")
   }

  }

  function mirroringImageY() {
    if(mirrorX === "1" && mirrorY === "0"){
      console.log("2 activés")
      setScaleFlipX(-1)
      setScaleFlipY(-1)
      setMirrorY("1")
    }else if(mirrorX === "0" && mirrorY === "0"){
      console.log("Juste X")
      setScaleFlipX(-1)
      setScaleFlipY(1)
      setMirrorY("1")
    }else if(mirrorX === "1" && mirrorY === "1"){
      console.log("Juste Y")
      setScaleFlipX(1)
      setScaleFlipY(-1)
      setMirrorY("0")
    }else{
      console.log("Retour normal")
      setScaleFlipX(1)
      setScaleFlipY(1)
      setMirrorY("0")
    }
   }
  
  async function makeChanges(){
    const filterRoute = isSepia ? "applySepia" :
    isBlackAndWhite ? "applyBlackAndWhite" :
    (mirrorX === "1" || mirrorY === "1") ? "applyJustMirroring" :
    null;
    setLoad(!load)
    if (filterRoute === null && mirrorX === "0" && mirrorY === "0"){
      try {
        
        onDownloadCropClick(); 

      } catch (error) {
        console.error("Error:", error);
      }
    }else{
      try {
        await colorChange();
        
        sleep(2000).then(() => {
          onDownloadCropClick()
          .then(() => {
            setLoad(false)         
          })
          .catch((erreur) => {
            console.error("Loader probleme :", erreur);
          });
        });

      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  
  
  async function onDownloadCropClick() {
    console.log('commencé');
  
    
    setBaseWidth(imgRef.current.naturalWidth);
    setBaseHeight(imgRef.current.naturalHeight);

    if(mirrorY === "1" || mirrorX === "1" ){
     if (mirrorY === "1" && rotate !== 0) {
        if (rotate > 0) {
        setRotate(-rotate);
        } else if (rotate < 0) {
          setRotate(Math.abs(rotate));
        }
      }else if(mirrorX === "1" && rotate !== 0){
        if (rotate > 0) {
          setRotate(-rotate);
        } else if (rotate < 0) {
          setRotate(Math.abs(rotate));
        }
    }
    }

    const image = document.getElementById("imageCanvas");
    const previewCanvas = previewCanvasRef.current;
  
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }
  
    const offscreen = new OffscreenCanvas(
      previewCanvas.width,
      previewCanvas.height
    );
  
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }
  
    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );
  
    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });
  
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
  
    blobUrlRef.current = URL.createObjectURL(blob);
    hiddenAnchorRef.current.href = blobUrlRef.current;
    hiddenAnchorRef.current.download = fileName;
    hiddenAnchorRef.current.click();
    
    defautInputs()
    

  }
  

  

  function colorChange() {
    const filterRoute = isSepia ? "applySepia" :
      isBlackAndWhite ? "applyBlackAndWhite" :
      (mirrorX === "1" || mirrorY === "1") ? "applyJustMirroring" :
      null;
  
    const image = document.getElementById("imageCanvas");
    const imageSrc = image.src;
    const base64Image = imageSrc.split(",")[1];
  
    return new Promise((resolve, reject) => {
      axios.post(`https://editof.netlify.app/.netlify/functions/${filterRoute}`, {
        imageData: base64Image,
        mirrorX: mirrorX,
        mirrorY: mirrorY,
      }, {
        headers: {
          'Content-Type': 'application/json', 
        },
        responseType: 'blob',
      })
      .then(response => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgSrc(reader.result?.toString() || "");
     
        });
        reader.readAsDataURL(response.data);
        
        resolve();
      })
      
      .catch(error => {
        console.error("Error:", error);
        reject(error);
      });
    });
  }

  useDebounceEffect(
    () => {
      (async () => {
        if (
          completedCrop?.width &&
          completedCrop?.height &&
          imgRef.current &&
          previewCanvasRef.current
        ) {
          await canvasPreview(
            imgRef.current,
            previewCanvasRef.current,
            completedCrop,
            scale,
            rotate
          );
        }
      })();
    },
    100,
    [completedCrop, scale, rotate]
  );


  

  function handleAspectChange(selectedValue) {
    if (selectedValue === 100) {
      setAspect(undefined);
      console.log('ok')
    } else {
      setAspect(selectedValue);
      console.log(selectedValue)
  
      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const newCrop = centerAspectCrop(width, height, selectedValue);
        setCrop(newCrop);
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height));
      }
    }
  }

  return (
    <div className="">
        <img src="logoEditofOpacity.png" className="w-28 mt-12 absolute desktop:hidden ml-[38%]"></img>

    <div className="Crop w-full h-screen flex justify-center align-center " >
      <div className="loadDiv" style={{ display: load ? 'flex' : 'none'}} id={load ? 'visible' : ''}>
      {load && (
        <Loader />
      )}
      </div>
      
      <section className="md:container  flex h-full w-full align-center justify-evenly p-12 bg-neutral-700 items-center">
      
      {/* {!isSelectVisible && (
                <button onClick={() => setIsSelectVisible(true)}>Crop</button>
            )}
       */}
      <Inputs 
            mirroringImageX={mirroringImageX}
            mirroringImageY={mirroringImageY}
            setMirrorX={setMirrorX}
            rotate={rotate}
            imgSrc={imgSrc}
            setRotate={setRotate}
            scale={scale}
            setScale={setScale}
            toggleSepia={toggleSepia}
            toggleBlackAndWhite={toggleBlackAndWhite}
            aspect={aspect}
            handleAspectChange={handleAspectChange}
            aspectOptions={aspectOptions}
            newWidth={newWidth}
            newHeight={newHeight}
            mirrorY={mirrorY}
            makeChanges={makeChanges}
                    />
      <section className="h-[80vh] pb-5 max-w-[900px] md:mt-[-100px] inline-block flex flex-col justify-center items-center">
        <div className="h-full overflow-hidden inline-block flex flex-col m-auto ">
      {!!imgSrc && (
        
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            style={{
              display:"inline-block"
            }}
              
            className="m-auto"
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={imageStyle}
              onLoad={onImageLoad}
              // onChange={onImageLoad}
              id="imageCanvas"
              className="m-auto max-h-96"
            />
          </ReactCrop>
        
        
      )}
      {!!completedCrop && (
        <>
          { <div>
            <canvas
            className=""
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
                display: "none",
              }}
            />
          </div> }
          
          <div> 
            {/* <div style={{ fontSize: 12, color: "#666" }}>
              You need to open the CodeSandbox preview in a new window (top
              right icon) as security restrictions prevent the download
            </div> */}
            <a
              href="#hidden"
              ref={hiddenAnchorRef}
              download
              style={{
                position: "absolute",
                top: "-200vh",
                visibility: "hidden",
              }}
            >
              Hidden download
            </a>
          </div>
        </>
      )}
      </div>
      <div class="flex items-center justify-center absolute desktop:bottom-8 md:bottom-5">
        <button onClick={makeChanges} className='my-5 w-40 text-white bg-blue-700 hover:bg-blue-800 bottom-0 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Download Crop</button>
      </div>  
        
        </section>
       
      </section>
      
    </div>
    
    </div>
  );
}

