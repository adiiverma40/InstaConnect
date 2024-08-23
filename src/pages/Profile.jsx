import React, { useEffect, useState } from "react";
import { HeadlessButton, LeftMenu } from "../Components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../appwrite/appwrite";
import { profileImage, userdetails } from "../store/authSlice";

function Profile() {
  const [username, setUsername] = useState("");
  const [bio , setBio] = useState("bio")
  const navigate = useNavigate()
  const selector = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(()=>{
      async function userInfo() {
        let promise = await getUserDetails(selector.userData.email)
        console.log(promise);
        dispatch(userdetails({username: promise.username , bio : promise.bio , id : promise.$id}))
        let id = selector.profileImageId
        dispatch(profileImage({profileImageId : id , profileImageUrl : promise.profileImage}))
        setUsername(promise.username)
        setBio(promise.bio)
      }
      if (selector.username == ""){
        userInfo()
      }
      else{
        setUsername(selector.username)
        setBio(selector.bio)
      }
  },[navigate , selector.userData , selector.status])
  return (
    <div className="flex">
      <LeftMenu />
      <div className="" style={{ width: "84%" }}>
        <div className="border flex pt-12 justify-center border-black w-full h-1/2">
          <div className="mx-12">
            <img
              src={selector.profileImageUrl}
              className=" w-40 h-40 "
              style={{ borderRadius: "50%" }}
              alt=""
            />
          </div>
          <div>
            <div className="flex">
            <p className="mr-3 text-lg">{username}</p>
            <HeadlessButton onclick={()=>(navigate('/edit'))} className="mx-1" text={"Edit Profile"} />
            <HeadlessButton onclick={()=>(navigate('/edit'))} className="mx-1" text={"View Archive"} />
            </div><div className="flex ">
            <p className=" mt-4 mb-4">8 Posts</p>
            <p className="ml-10 mt-4 mb-4">9 Followers</p>
            <p className="ml-10 mt-4 mb-4">23 Following</p>
            </div>
            
            <p>
              <b>{selector.userData.name}</b>
              <p style={{ whiteSpace: "pre-wrap" }}>
               {bio}
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
