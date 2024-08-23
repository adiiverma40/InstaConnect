import React, { useEffect, useState } from "react";
import { HeadlessButton, LeftMenu, Input, Button } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserDetails,
  AppwriteUpdateName,
  getProfileImage,
} from "../appwrite/appwrite";
import { profileImage, userdetails } from "../store/authSlice";
import ReactDrop from "../Components/ReactDrop";

function EditProfile() {
  const selector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bio, setBio] = useState("");
  const maxChars = 255;
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [uploadImage, setUploadImage] = useState(false);
  const [uploadBio, setUploadBio] = useState("");
  useEffect(() => {
    if (selector.username == "") {
      return;
    } else {
      setName(selector.userData.name);
      setUsername(selector.username);
      setBio(selector.bio);
    }
  }, [navigate, selector.username, selector.bio, selector.status]);

  const handleChange = (e) => {
    setBio(e.target.value);
  };

  async function handleSubmit() {
    const formattedBio = bio.replace(/\n/g, "<br/>");
    console.log(`username : ${username} name : ${name}  bio : ${formattedBio}`);
    console.log("update user detail");
    setUploadBio(formattedBio);
    if (selector.profileImageUrl === "") {
      let promise = await updateUserDetails(
        selector.databaseId,
        username,
        formattedBio
      );
      console.log("UPDATE NAME");
      let updateName = await AppwriteUpdateName(name);
      console.log(promise, updateName);
      dispatch(
        userdetails({
          username: promise.username,
          bio: promise.bio,
          id: promise.$id,
        })
      );
    } else {
      let promise = await updateUserDetails(
        selector.databaseId,
        username,
        bio,
        selector.profileImageUrl
      );
      console.log("UPDATE NAME");
      let updateName = await AppwriteUpdateName(name);
      console.log(promise, updateName);
      dispatch(
        userdetails({
          username: promise.username,
          bio: promise.bio,
          id: promise.$id,
        })
      );
    }

    navigate("/profile");
  }

  function handleUpload() {
    setUploadImage(true);
  }
  function handleClose() {
    setUploadImage(false);
  }

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const promise = await getProfileImage(selector.profileImageId);
        console.log(promise);
        const id = selector.profileImageId;
        console.log("app", promise.href);
        dispatch(
          profileImage({ profileImageId: id, profileImageUrl: promise.href })
        );
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    if (selector.profileImageId && selector.profileImageId !== "") {
      fetchProfileImage();
      setUploadImage(false);
    }
    if (selector.profileImageId && selector.profileImageId !== "") {
      setUploadImage(false);
    }
  }, [selector.profileImageId]);

  function handleKeyDown() {
    const formattedBio = bio.replace(/\n/g, "<br/>");
    setUploadBio(formattedBio);
  }

  return (
    <>
      <div className="flex">
        <LeftMenu />
        <div className="" style={{ width: "84%" }}>
          <div>
            <p className="font-bold text-lg text-center mt-8">Edit Profile</p>
            <div className="mx-auto mt-8 bg-gray-300 rounded-lg w-1/2 h-24 flex justify-center items-center">
              <img
                src={selector.profileImageUrl}
                className="w-20 h-20"
                style={{ borderRadius: "50%" }}
              />
              <div className="mx-4">
                <p className="font-bold text-base">{selector.username}</p>
                <p className="font-thin-">{selector.userData.name}</p>
              </div>
              <HeadlessButton
                onclick={handleUpload}
                className="ml-72"
                text={"Change Photo"}
              />
            </div>
          </div>

          <div className="w-full">
            <div className="mx-auto w-1/2">
              <Input
                value={name}
                placeholder="Name"
                label="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                value={username}
                placeholder="username"
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mx-auto w-1/2 relative">
              <p className="font-bold text-lg my-5">Bio</p>
              <div className="relative">
                <textarea
                  value={bio}
                  onChange={handleChange}
                  maxLength={maxChars}
                  rows="2"
                  cols="50"
                  onKeyDown={handleKeyDown}
                  placeholder="Write your bio here..."
                  className="w-full p-2 border rounded-lg"
                  style={{ resize: "none" }}
                />
                <p className="absolute bottom-2 right-2 text-sm text-gray-500">
                  {bio.length}/{maxChars}
                </p>
              </div>
              <Button onClick={handleSubmit} className="w-2/5 mt-3">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {uploadImage ? (
        <div className="w-full h-1/2 absolute top-0">
          <span
            onClick={handleClose}
            className="cursor-pointer text-white z-50 absolute top-4 text-xl font-bold"
            style={{ left: "95%" }}
          >
            X
          </span>
          <ReactDrop />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default EditProfile;
