import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function ReactDrop() {
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]); // Store the selected file
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Restrict to image files only
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      // Upload the file to Appwrite storage bucket
    } catch (error) {
      console.error("File upload error:", error);
      setUploadError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative h-screen w-screen flex justify-center items-center">
      {/* Blurred Background */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 upload-container bg-white p-6 border border-black rounded-lg shadow-lg w-1/2 h-1/2 flex flex-col justify-center items-center">
        <div
          {...getRootProps()}
          className="dropzone w-full h-full flex justify-center items-center border-dashed border-2 border-gray-400"
        >
          <input {...getInputProps()} />
          <p>
            Drag & drop your profile picture here, or click to select a file
          </p>
        </div>

        {file && (
          <div className="mt-4">
            <p>Selected file: {file.name}</p>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        )}

        {uploadError && (
          <p className="error-text text-red-500">{uploadError}</p>
        )}
      </div>
    </div>
  );
}

export default ReactDrop;
