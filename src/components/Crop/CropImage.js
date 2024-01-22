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

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 97,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}


export default function CropImage({onCropChange, imgSrc, setImgSrc, fileName, setIsSelectVisible, isSelectVisible}) {
  
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
  const [scaleFlipX, setScaleFlipX] = useState()
  const [scaleFlipY, setScaleFlipY] = useState()
  

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
    setStyle()
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }else{
      setAspect(undefined)
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, 3/2));
    }
    
    if (previewCanvasRef.current && completedCrop) {
      canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop,
        scale,
        rotate
      );
    }
  }
  

  useEffect(() =>{
    const image = imgRef.current;
    const { width, height } = imgRef.current;
    // console.log("manualheight="+manualHeight)
    if(crop){
      
      setNewWidth(Math.round((crop.width / 100) * baseWidth))
      setNewHeight(Math.round((crop.height / 100) * baseHeight))
    }
    
  },[crop, rotate])

  function setStyle(){
    setScaleFlipX(1)
    setScaleFlipY(1)
    setMirrorX("0")
  }

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
  
    if (filterRoute === null){
      try {
        
        onDownloadCropClick(); // Attend que onDownloadCropClick soit terminé
        // Reste du code
      } catch (error) {
        console.error("Error:", error);
      }
    }else{
      try {
        await colorChange(); // Attend que colorChange soit terminé
        sleep(2000).then(() => {
          onDownloadCropClick();
        });
        // Reste du code
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function onDownloadCropClick() {
    console.log('commencé')
    setBaseWidth(imgRef.current.naturalWidth);
    setBaseHeight(imgRef.current.naturalHeight);
    
  
    const image = document.getElementById("imageCanvas"); // Utiliser getElementById
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
      axios.post(`http://localhost:8000/${filterRoute}`, {
        imageData: base64Image,
        mirrorX: mirrorX,
        mirrorY: mirrorY,
      }, {
        responseType: 'blob',
      })
      .then(response => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgSrc(reader.result?.toString() || "");
           // Résoud la promesse une fois que tout est terminé
        });
        reader.readAsDataURL(response.data);
        resolve();
      })
      
      .catch(error => {
        console.error("Error:", error);
        reject(error); // Rejette la promesse en cas d'erreur
      });
    });
  }








  function blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
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
 
  function handleRotateChange() {
    const rotateInput = document.getElementById("rotate-input")
    const value = Math.min(180, Math.max(-180, Number(rotateInput.value)));
    setRotate(value);
    console.log("coucou")
  }

  return (
    <div className="Crop flex justify-center ">
      <container className="flex justify-evenly p-4 bg-neutral-100">
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
            handleRotateChange={handleRotateChange}
        />
      <section className="flex">
      {!!imgSrc && (
        
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            style={{
              width: "800px",
            }}
            
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={imageStyle}
              onLoad={onImageLoad}
              onChange={onImageLoad}
              id="imageCanvas"
            />
          </ReactCrop>
        
        
      )}
      {!!completedCrop && (
        <>
          { <div>
            <canvas
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
            <button onClick={makeChanges}>Download Crop</button> 
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
          <div className="absolute bottom-0 right-1/3 mb-3 mr-5">
              <label>Width:</label>

              <span>{newWidth}</span>
          </div>
          <div className="absolute right-0 top-1/2 p-8">
              <label>Height:</label>
          
              <span>{newHeight}</span>
          </div>
        </section>
      </container>
    </div>
  );
}

