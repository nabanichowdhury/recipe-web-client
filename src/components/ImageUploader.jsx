import React, { useState } from "react";

const ImageUploader = () => {
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <button className="btn btn-primary">Upload Image</button>
      </label>
      {uploadedImageUrl && (
        <div>
          <img
            src={uploadedImageUrl}
            alt="Uploaded"
            style={{ maxWidth: "300px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
