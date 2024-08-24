import React, { useEffect, useState } from "react";
import { LeftMenu } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../appwrite/appwrite";
import { profileImage, userdetails } from "../store/authSlice";
function Home() {
  const selector = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //TODO: useEffect here to set the profile details from here
  //TODO: or just get profile Image

  useEffect(() => {
    console.log("useEffect");
    async function getDetails() {
      console.log("getDetails");
      if (selector.status && selector.userData) {
        const promise = await getUserDetails(selector.userData.email);
        console.log(promise);
        if (
          promise.username !== selector.username ||
          promise.name !== selector.name||
          promise.bio !== selector.bio||
          promise.$id !== selector.databaseId 
        ) {
          dispatch(
            userdetails({
              username: promise.username,
              name: promise.name,
              bio: promise.bio,
              id: promise.$id,
            })
          );
        }
        if (
          promise.profileImageId !== selector.profileImageId ||
          promise.profileImageUrl !== selector.profileImageUrl
        ) {
          dispatch(
            profileImage({
              profileImageId: promise.profileImageId || "",
              profileImageUrl: promise.profileImage || "",
            })
          );
        }
      }
    }
    if (!selector.username || !selector.name || !selector.bio || !selector.databaseId) {
      getDetails();
    }
  }, [
    selector.username,
    selector.name,
    selector.bio,
    selector.databaseId,
    selector.profileImageId,
    selector.profileImageUrl,
    selector.status,
    selector.userData,
    dispatch,
    navigate
  ]);

  useEffect(() => {
    if (selector.status) return;
    else navigate("/");
  }, [navigate, selector.status, selector.userData]);

  return (
    <div className="flex">
      <LeftMenu />
      Home
    </div>
  );
}

export default Home;
