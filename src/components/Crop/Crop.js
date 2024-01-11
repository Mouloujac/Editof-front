import React, { useState, useRef, useEffect } from "react";
import ReactCrop, {
  makeAspectCrop,
  convertToPixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";
import axios from "axios";

function centerCrop(mediaWidth, mediaHeight, aspect) {
  return makeAspectCrop(
    {
      unit: "%",
      width: 90,
    },
    aspect,
    mediaWidth,
    mediaHeight,
  );
}

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(mediaWidth, mediaHeight, aspect);
}

export default function Crop({onCropChange, imgSrc}) {
  
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const hiddenAnchorRef = useRef(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(16 / 9);
  const [isSepia, setIsSepia] = useState(false);
  const [isBlackAndWhite, setIsBlackAndWhite] = useState(false);
  const [newImage, setNewImage] = useState()

  const toggleSepia = () => {
    setIsSepia(!isSepia);
    setIsBlackAndWhite(false); // Ensure only one filter is applied at a time
  };

  const toggleBlackAndWhite = () => {
    setIsBlackAndWhite(!isBlackAndWhite);
    setIsSepia(false); // Ensure only one filter is applied at a time
  };

  const imageStyle = {
    maxWidth: "100%",
    filter: isSepia
      ? "sepia(1)"
      : isBlackAndWhite
      ? "grayscale(1)"
      : "none",
    transform: `scale(${scale}) rotate(${rotate}deg)`
  };







  const applySepia = () => {
    if (imgSrc) {
      if (isSepia == true){
      // Extract base64-encoded image data
      const base64Image = newImage.split(",")[1];
  
      // Send the image data to the server using axios
      axios
        .post("http://localhost:8000/applySepia", {
          imageData: base64Image,
        }, {
          responseType: 'blob', // Set the response type to blob
        })
        .then((response) => {
          // Create a blob from the response data
          const blob = new Blob([response.data], { type: response.headers['content-type'] });
  
          // Create a link element
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
  
          // Set the download attribute with the desired file name
          link.download = 'modified_image.jpg';
  
          // Append the link to the document
          document.body.appendChild(link);
  
          // Trigger a click on the link to initiate the download
          link.click();
  
          // Remove the link from the document
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      }
      if (isBlackAndWhite == true){
        const base64Image = imgSrc.split(",")[1];
  
      // Send the image data to the server using axios
      axios
        .post("http://localhost:8000/applyBlackAndWhite", {
          imageData: base64Image,
        }, {
          responseType: 'blob', // Set the response type to blob
        })
        .then((response) => {
          // Create a blob from the response data
          const blob = new Blob([response.data], { type: response.headers['content-type'] });
          console.log(blob)
          // Create a link element
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
  
          // Set the download attribute with the desired file name
          link.download = 'modified_image.jpg';
  
          // Append the link to the document
          document.body.appendChild(link);
  
          // Trigger a click on the link to initiate the download
          link.click();
  
          // Remove the link from the document
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      }
    }
  };









  // crop 

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }












  async function onDownloadCropClick() {
    
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
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
    const dataURL = await blobToDataURL(blob);
    const base64Image = dataURL.split(",")[1];
    axios
        .post("http://localhost:8000/applySepia", {
          imageData: base64Image,
        }, {
          responseType: 'blob', // Set the response type to blob
        })
        .then((response) => {
          // Create a blob from the response data
          const blob = new Blob([response.data], { type: response.headers['content-type'] });
          console.log(blob)
          // Create a link element
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
  
          // Set the download attribute with the desired file name
          link.download = 'modified_image.jpg';
  
          // Append the link to the document
          document.body.appendChild(link);
  
          // Trigger a click on the link to initiate the download
          link.click();
  
          // Remove the link from the document
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error:", error);
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

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else {
      setAspect(16 / 9);

      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const newCrop = centerAspectCrop(width, height, 16 / 9);
        setCrop(newCrop);
        setCompletedCrop(convertToPixelCrop(newCrop, width, height));
      }
    }
  }

  return (
    <div className="Crop">
      <button onClick={onCropChange}>Crop</button>

      <div className="Crop-Controls">
        <div>
          <label htmlFor="scale-input">Scale: </label>
          <input
            id="scale-input"
            type="number"
            step="0.1"
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rotate-input">Rotate: </label>
          <input
            id="rotate-input"
            type="number"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          />
          <div>
            <button onClick={toggleSepia}>Toggle Sepia</button>
          </div>
          <div>
            <button onClick={toggleBlackAndWhite}>Toggle B&W</button>
          </div>
        </div>
        <div>
          <button onClick={handleToggleAspectClick}>
            Toggle aspect {aspect ? "off" : "on"}
          </button>
        </div>
      </div>
      {!!imgSrc && (
        
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={imageStyle}
            onLoad={onImageLoad}
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
            <button onClick={applySepia}>Apply Changes</button>
          </div>
          <div>
            <button onClick={onDownloadCropClick}>Download Crop</button>
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
  );
}

