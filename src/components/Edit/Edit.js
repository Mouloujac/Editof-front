import React, { useState } from "react";
import axios from "axios";


export default function Edit({ selectedImage, onCropChange }) {
  const [isSepia, setIsSepia] = useState(false);
  const [isBlackAndWhite, setIsBlackAndWhite] = useState(false);
  const [modifiedImage, setModifiedImage] = useState(null);

  const toggleSepia = () => {
    setIsSepia(!isSepia);
    setIsBlackAndWhite(false); // Ensure only one filter is applied at a time
  };

  const toggleBlackAndWhite = () => {
    setIsBlackAndWhite(!isBlackAndWhite);
    setIsSepia(false); // Ensure only one filter is applied at a time
  };

  
  const applySepia = () => {
    if (selectedImage) {
      if (isSepia == true){
      // Extract base64-encoded image data
      const base64Image = selectedImage.split(",")[1];
  
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
        const base64Image = selectedImage.split(",")[1];
  
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
  
  
  
    

  const imageStyle = {
    maxWidth: "100%",
    filter: isSepia
      ? "sepia(1)"
      : isBlackAndWhite
      ? "grayscale(1)"
      : "none",
  };

  return (
    <div className="EditImg">
      <button onClick={onCropChange}>Crop</button>
      <button onClick={toggleSepia}>Toggle Sepia</button>
      <button onClick={toggleBlackAndWhite}>Toggle B&W</button>
      <button onClick={applySepia}>Apply Changes</button>
      <div>
        <p>Image sélectionnée :</p>
        <img src={selectedImage} alt="Selected" style={imageStyle} />
      </div>
    </div>
  );
}
