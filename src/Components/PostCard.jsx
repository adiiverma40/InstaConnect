import React, { useState, useRef, useEffect } from "react";
import { deletePosts, fetchUserByUsername } from "../appwrite/appwrite";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postDeleted } from "../store/authSlice";
function PostCard({ src, postsDetails }) {
  const [isActive, setIsActive] = useState(false);
  const postRef = useRef(null);
  const [profileImg, setProfileImage] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteText , setDeleteText] = useState("Delete Post")
  const Selector = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    async function getUserProfile() {
      let promise = await fetchUserByUsername(postsDetails.username);
      console.log(promise.documents[0].profileImage);

      setProfileImage(promise.documents[0].profileImage);
    }
    getUserProfile();
  }, [postsDetails]);

  function showPost() {
    setIsActive(true);
  }

  function handleClickOutside(event) {
    if (postRef.current && !postRef.current.contains(event.target)) {
      setIsActive(false);
    }
  }

  useEffect(() => {
    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  useEffect(() => {
    if (Selector.username && postsDetails.username === Selector.username) {
      console.log("True");
      setIsAdmin(true);
    }
  }, [postsDetails]);
  
  async function Delete() {
    setDeleteText("Deleting......")
    let response = await deletePosts(postsDetails.$id , postsDetails.postImageId)
    setDeleteText("Deleted!!!!")
    setIsActive(false)
    setDeleteText("Delete post")
    dispatch(postDeleted({deletedPost : true}))
    console.log(response);
    
    
  }

  return (
    <>
      <div className=" w-80 h-80 inline-block mr-1 rounded-md">
        <img
          onClick={showPost}
          src={src}
          alt=""
          className="object-cover hover:cursor-pointer w-80 h-80"
        />
      </div>
      {isActive && (
        <div
          className="absolute top-0 left-0 w-screen h-screen "
          style={{ background: "rgba(0,0,0,0.7)" }}
        >
          <div
            ref={postRef}
            className="h-3/4 w-2/3  flex absolute shadow-lg rounded-lg  bg-white"
            style={{ top: "12%", left: "17%" }}
          >
            <div className="w-1/2 h-full">
              <img
                src={src}
                alt=""
                className="object-cover hover:cursor-pointer w-full h-full"
              />
            </div>
            <div className="w-1/2 h-full ">
              <span className="w-full h-14 items-center flex relative">
                <img
                  src={profileImg}
                  alt="Profile"
                  style={{
                    width: "40px", // Ensure equal width and height
                    height: "40px",
                    borderRadius: "50%", // Makes the image circular
                    objectFit: "cover", // Ensures the image covers the container without stretching
                  }}
                  className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500"
                />
                <h2 className="mx-2">{postsDetails.username}</h2>
                {isAdmin && (
                  <p
                  onClick={()=> setIsDelete(prev => !prev)}
                    className="font-extrabold text-2xl hover:cursor-pointer pb-3 absolute right-0 mr-2"
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                  >
                    ...
                  </p>
                )}
                {isDelete && (
                  <ul className="relative bg-slate-300 hover:cursor-pointer">
                    <li  onClick={Delete} className="absolute  bg-slate-200 shadow-lg rounded-lg text-center p-3 font-semibold hover:cursor-pointer top-4 left-64 w-32">
                     {deleteText}
                    </li>
                  </ul>
                )}
              </span>
              <hr />
              <div className="w-full h-3/4">
                <span className="w-full  mt-3 flex relative">
                  <img
                    src={profileImg}
                    alt="Profile"
                    style={{
                      width: "40px", // Ensure equal width and height
                      height: "40px",
                      borderRadius: "50%", // Makes the image circular
                      objectFit: "cover", // Ensures the image covers the container without stretching
                    }}
                    className="mx-2 text-gray-600 transition-colors duration-300"
                  />

                  <p className="mx-1 whitespace-pre-wrap ">
                    <span className="font-semibold mr-1">
                      {postsDetails.username}
                    </span>
                    {postsDetails.caption}
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostCard;
