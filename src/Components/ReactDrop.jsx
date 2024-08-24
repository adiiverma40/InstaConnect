import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { deleteProfileImage, uploadProfileImage } from "../appwrite/appwrite";
import { useDispatch, useSelector } from "react-redux";
import { profileImage } from "../store/authSlice";

function ReactDrop() {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // State to hold the image preview
  const [uploadError, setUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file); // Store the selected file

    // Create a preview URL for the image
    setFilePreview(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Restrict to image files only
    maxFiles: 1,
  });

  useEffect(() => {
    console.log("ProfileImageID : ", selector.profileImageId);
  }, []);

  useEffect(() => {
    // Cleanup the object URL to avoid memory leaks
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setUploadError(null);

    try {
      // Upload the file to Appwrite storage bucket
      console.log(file);
      console.log("Uploading File.....");
      
      const promise = await uploadProfileImage(file);
      console.log(promise);
    

      if (selector.profileImageId && selector.profileImageId !== promise.$id) {
        console.log("Store :" , selector.profileImageId);
        console.log("API :"  , promise.$id);
        

        console.log("Deleting....");
        
        const deleteProfileImage2 = await deleteProfileImage(
          selector.profileImageId
        );
        console.log("Deletion success", deleteProfileImage2);
      }
  
      dispatch(profileImage({ profileImageId: promise.$id }));
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
            {/* Image Preview */}
            {filePreview && (
              <img
                src={filePreview}
                alt="Preview"
                className="mt-2 h-40 w-40 object-cover rounded-full"
              />
            )}
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
