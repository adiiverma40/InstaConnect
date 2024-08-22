import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "./icons";
import { useSelector } from "react-redux";
import MoreOptions from "../MoreOption";
import PopupOver from "../PopupOver";
function LeftMenu() {
  const selector = useSelector((state) => state.auth);
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();
  const [popUp , setPopUp] = useState(false)

  function popUpfn(){
    setPopUp(true)
  }
 
  useEffect(() => {
    if (selector.status && selector.userData?.photoUrl) {
      setProfilePic(selector.userData.photoUrl);
      console.log(selector.userData);
    } else {
      setProfilePic("");
    }
  }, [selector.status, selector.userData?.photoUrl, navigate]);

  return (
    <div className=" h-screen border-r border-black" style={{ width: "16%" }}>
      <h2 className="pt-12 mx-8 font-bold text-lg">InstaConnect</h2>
      <div>
        <ul>
          <li className=" mx-8 mt-2 rounded p-3 transition-colors duration-200 hover:bg-gray-300 hover:cursor-pointer">
            <NavLink to={"/home"} className="flex items-center">
              <FontAwesomeIcon
                className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500"
                icon={icons.house}
              />{" "}
              Home{" "}
            </NavLink>{" "}
          </li>
          <li className=" mx-8 mt-2 rounded p-3 transition-colors duration-200 hover:bg-gray-300 hover:cursor-pointer">
            <NavLink className="flex items-center">
              <FontAwesomeIcon
                className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500"
                icon={icons.search}
              />{" "}
              Search{" "}
            </NavLink>{" "}
          </li>
          <li className=" mx-8 mt-2 rounded p-3 transition-colors duration-200 hover:bg-gray-300 hover:cursor-pointer">
            <NavLink className="flex items-center">
              <FontAwesomeIcon
                className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500"
                icon={icons.explore}
              />
              Explore{" "}
            </NavLink>{" "}
          </li>
          <li className=" mx-8 mt-2 rounded p-3 transition-colors duration-200 hover:bg-gray-300 hover:cursor-pointer">
            <NavLink className="flex items-center">
              <FontAwesomeIcon
                className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500"
                icon={icons.reels}
              />{" "}
              Reels{" "}
            </NavLink>{" "}
          </li>
          <li className=" mx-8 mt-2 rounded p-3 transition-colors duration-200 hover:bg-gray-300 hover:cursor-pointer">
            <NavLink className="flex items-center">
              <FontAwesomeIcon
                className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500"
                icon={icons.chats}
              />{" "}
              Messages{" "}
            </NavLink>{" "}
          </li>
          <li className="mx-8 mt-2 rounded p-3 transition-colors duration-200 hover:bg-gray-300 hover:cursor-pointer">
            <NavLink className="flex items-center">
              <FontAwesomeIcon
                className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500"
                icon={icons.notification}
              />{" "}
              Notifications{" "}
            </NavLink>{" "}
          </li>
          <li className=" mx-8 mt-2 rounded p-3 transition-colors duration-200 hover:bg-gray-300 hover:cursor-pointer">
            <NavLink className="flex items-center">
              <FontAwesomeIcon
                className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500 border-2 p-1 rounded border-black"
                icon={icons.create}
              />{" "}
              Create{" "}
            </NavLink>{" "}
          </li>
          <li className="mx-8 mt-2 rounded p-3 transition-colors duration-200 hover:bg-gray-300 hover:cursor-pointer">
            <NavLink to={"/profile"} className="flex items-center">
              <img
                src={profilePic}
                style={{borderRadius: "50%" , width:"16%"}}
                className="mx-2  text-gray-600 transition-colors duration-300 hover:text-blue-500"
              />{" "}
              Profile{" "}
            </NavLink>{" "}
          </li>
        </ul>
      </div>
      
      <div  className=" mx-8  rounded p-3 transition-colors duration-200   hover:cursor-pointer">
     
       <PopupOver> <span className="hover:bg-gray-300 p-3 text-lg"><FontAwesomeIcon icon={icons.menu}/> Menu </span></PopupOver>
       
       </div> </div>
    
  );
}

export default LeftMenu;
