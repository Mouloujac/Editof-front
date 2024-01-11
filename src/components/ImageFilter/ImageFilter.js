import React, { useState } from "react";
import axios from "axios";
import { imageConfig } from "react-image-file-resizer"; // Import from the library

export default function ImageFilter() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        // Resize the image before setting it in state
        resizeImage(reader.result, (resizedImage) => {
          setSelectedImage(resizedImage);
        });
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const resizeImage = (imageData, callback) => {
    imageConfig.filesize = 512000; // Set the maximum file size (in bytes)
    imageConfig.maxWidth = 800; // Set the maximum width of the image
    imageConfig.maxHeight = 800; // Set the maximum height of the image

    // Resize the image using react-image-file-resizer
    imageConfig.callback = (resizedImage) => {
      callback(resizedImage);
    };

    // Call the resize function
    window.imageFileResizer(imageData, imageConfig);
  };

  const applySepia = () => {
    if (selectedImage) {
      // Send the resized image data to the server using axios
      axios
        .post("http://localhost:8000/applySepia", {
          imageData: selectedImage.split(",")[1],
        })
        .then((response) => {
          // Handle the response from the server
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {selectedImage && (
        <div>
          <p>Selected Image:</p>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: "100%" }} />
          <button onClick={applySepia}>Apply Sepia</button>
        </div>
      )}
    </div>
  );
}
