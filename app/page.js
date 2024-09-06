'use client'
import React, { useState } from 'react';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    if (!image) return;

    try {
      const response = await fetch('/api/image', {
        headers: {
          'Content-Type': 'image/png',
        },  
        method: 'POST',
        body: image
      });

      if (!response.ok) {
        throw new Error('Failed to compress image');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setCompressedImage(url);

    } catch (error) {
      console.error(error);
      alert('Error compressing image');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload and Compress</button>
      {compressedImage && <img src={compressedImage} alt="Compressed" />}
    </div>
  );
};

export default ImageUploader;