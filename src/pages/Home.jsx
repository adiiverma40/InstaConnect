import React, { useEffect, useState } from "react";
import { LeftMenu } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppwriteGet, getUserDetails } from "../appwrite/appwrite";
import { profileImage, userdetails , login} from "../store/authSlice";
function Home() {
  const selector = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //TODO: useEffect here to set the profile details from here
  //TODO: or just get profile Image

  useEffect(() => {
    async function getDetails() {
      if (selector.status && selector.userData) {
        const promise = await getUserDetails(selector.userData.email);
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
    async function checkLogin() {
      try {
        const promise = await AppwriteGet();
        if (promise) {
          dispatch(login({ userData: promise }));
        } else {
          console.log("Home else");
          
          alert("Please Login");
          navigate('/');
        }
      } catch (error) {
        console.error("Error during login check:", error);
      }
    }
  
    // Check if `selector.userData` is available and its `status`
    if (!selector.userData || selector.userData.status !== true) {
      checkLogin();
      console.log("Checked login");
    }
  }, [navigate, selector.userData, dispatch]);
  

  return (
    <div className="flex">
      <LeftMenu />
      Home
    </div>
  );
}

export default Home;



// TODO: remove the search bar after clicking on any users profile
// * Rest is Rest 