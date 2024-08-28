import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { HeadlessButton } from "../Components";
import { useSelector } from "react-redux";
import { uploadPost, uploadPostContent } from "../appwrite/appwrite";
import { Navigate, useNavigate } from "react-router-dom";

function CreatePost() {
  const [images, setImages] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDropDisable, setIsDropDisable] = useState(false);
  const [upload, setUpload] = useState(false);
  const selector = useSelector((state) => state.auth);
  const [imageDimensions, setImageDimensions] = useState({});
  const [processingComplete, setProcessingComplete] = useState(false);
  const [imagesId , setImagesId] = useState([])
  const [imagesUrl , setImagesUrl] = useState([])
  const [caption , setCaption] = useState("")
  const [btnText , setBtnText] = useState("Upload")
  const navigate = useNavigate()
  const onDrop = (acceptedFiles ) => {
    const previews = acceptedFiles.map((file) => URL.createObjectURL(file));
    const files = acceptedFiles.map((file) => file);
    setImages(files);
    setFilePreviews(previews);
    setIsDropDisable(true);

    let filesProcessed = 0; // Track the number of processed files

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImageDimensions((prev) => ({
            ...prev,
            [file.name]: { width: img.width, height: img.height },
          }));

          filesProcessed++;
          // Check if all files are processed
          if (filesProcessed === acceptedFiles.length) {
            setProcessingComplete(true);
          }
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });

    // In case there are no files
    if (acceptedFiles.length === 0) {
      setProcessingComplete(true);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true, // Allow multiple files
    disabled: isDropDisable,
  });

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : filePreviews.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < filePreviews.length - 1 ? prevIndex + 1 : 0
    );
  };

  async function uploadImage() {
    try {
      setBtnText("Uploading.....")
      const uploadPromises = images.map(image => uploadPost(image));

      const results = await Promise.all(uploadPromises);

      results.forEach(result => {
        console.log(result);
        // Assuming you want to store all image IDs, you might collect them in an array
        setImagesId(prevIds => [...prevIds, result.promise.$id]);
        setImagesUrl(prev => [...prev , result.url.href] )
      });
  
      // Indicate upload is complete
      setUpload(true);
    } catch (error) {
      console.error('Upload failed:', error);
      // Handle errors here (e.g., show a notification to the user)
    }
  }
  async function uploadPostFn() {
    console.log(imagesId);
    let promise = await uploadPostContent(selector.username , caption , imagesUrl , imagesId)
    console.log(promise);
    navigate("/home")

    
  }
  
  return (
    <div
      className={`transition-container ${
        upload ? "uploaded" : "not-uploaded"
      } ${
        upload ? "" : "p-4"
      } border border-black shadow-lg rounded-lg bg-white  flex flex-col items-center justify-center`}
    >
      {!upload && (
        <div
          {...getRootProps({
            className:
              "dropzone border-dashed border-2 border-gray-400 p-4 w-full h-full flex items-center justify-center",
          })}
        >
          <input {...getInputProps()} />

          {filePreviews.length > 0 ? (
            <div className="relative w-full h-full flex flex-col items-center space-y-4">
              <div className="relative w-full flex flex-col items-center">
                {/* Image Display */}
                {processingComplete && (
                  <div
                    className="relative w-full"
                    style={{
                      aspectRatio: `${
                        imageDimensions[images[currentIndex].name]?.width || 1
                      } / ${
                        imageDimensions[images[currentIndex].name]?.height || 1
                      }`,
                      maxWidth: "100%",
                      maxHeight: "70vh",
                    }}
                  >
                    <img
                      src={filePreviews[currentIndex]}
                      alt="Preview"
                      className="object-cover rounded-lg w-full h-full"
                    />
                  </div>
                )}
                {/* Navigation Buttons */}
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                  <button
                    onClick={handlePrevious}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute left-96 top-1/2 transform  -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                  >
                    &gt;
                  </button>
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex space-x-2">
                {filePreviews.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Upload Button */}
              <div className="w-full flex justify-center mt-4">
                <HeadlessButton
                  className="block"
                  text={btnText}
                  onclick={uploadImage}
                />
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              Drag 'n' drop images here, or click to select them
            </p>
          )}
        </div>
      )}

      {upload && (
        <div className=" mx-2  h-full w-full">
          <div className="flex justify-evenly h-11 items-center border border-b-2 shadow-md">
            <h3 className="text-center w-3/4 text-lg">Create New Post</h3>
            <button
              onClick={uploadPostFn}
              className={"hover:bg-white bg-white text-blue-500 mt-0 pt-0 "}
            >Share</button>
          </div>
          <div
            className="flex  mt-3 justify-center "
            style={{ height: "100%" }}
          >
            <div className="w-1/2 " style={{ height: "85%" }}>
              {filePreviews.length > 0 ? (
                <div className="relative w-full h-full flex flex-col items-center space-y-4">
                  <div
                    className="relative w-full"
                    style={{
                      aspectRatio: `${
                        imageDimensions[images[currentIndex].name]?.width || 1
                      } / ${
                        imageDimensions[images[currentIndex].name]?.height || 1
                      }`,
                      maxWidth: "100%",
                      maxHeight: "60vh",
                    }}
                  >
                    <img
                      src={filePreviews[currentIndex]}
                      alt="Preview"
                      className="object-cover rounded-lg w-full h-full"
                    />
                    <button
                      onClick={handlePrevious}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                    >
                      &lt;
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                    >
                      &gt;
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    {filePreviews.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">
                 No images Found
                </p>
              )}
            </div>
            <div className="" style={{ width: "48%", height: "85%" }}>
              <span className="flex items-center m-4 ">
                <img
                  src={selector.profileImageUrl}
                  alt="Profile"
                  style={{
                    width: "40px", // Ensure equal width and height
                    height: "40px",
                    borderRadius: "50%", // Makes the image circular
                    objectFit: "cover", // Ensures the image covers the container without stretching
                  }}
                  className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500"
                />
                <h1 className="font-medium text-base">{selector.username}</h1>
              </span>
              <div className="relative">
                <textarea
                  name="caption"
                  id="caption"
                  cols="30"
                  rows="4"
                  value={caption}
                  onChange={(value) => setCaption(value.target.value)}
                  className="mx-3  p-2 border-none outline-none rounded-lg"
                  style={{ resize: "none", width: "95%" }}
                />
                <p className="absolute bottom-2 right-2 text-sm text-gray-500">
                  {"500"}/{"1000"}
                </p>
              </div>
              <hr />
              <p className="mx-3 mt-4 text-center ">IDK how to add Loaction</p>
              <p className="mx-3 mt-4 text-center ">IDK how to add Loaction</p>
              <p className="mx-3 mt-4 text-center ">IDK how to add Loaction</p>
              <hr className="mt-4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
