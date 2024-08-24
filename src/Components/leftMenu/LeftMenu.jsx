
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "./icons";
import { useDispatch, useSelector } from "react-redux";
import PopupOver from "../PopupOver";
import Search from "../../pages/Search";
import { toggleSearch, viewUser } from "../../store/authSlice";

function LeftMenu() {
  const selector = useSelector((state) => state.auth);
  const [profilePic, setProfilePic] = useState("");
  const [activeMenu, setActiveMenu] = useState(""); // State to track the active menu
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch()

  useEffect(() =>{
    console.log("toggle search");
    
    if(selector.isSearch){
      setShowSearch(true)
      console.log("true");
      
    }else {setShowSearch(false)
      console.log("false");
      
    }

  } , [selector.isSearch])


  
  useEffect(() => {
    if (selector.profileImageUrl !== "") {
      setProfilePic(selector.profileImageUrl);
    } else {
      setProfilePic("https://placehold.co/400x400/000000/FFF");
    }
  }, [selector.status, selector.profileImageUrl, navigate]);

  const menuItems = [
    { to: "/home", icon: icons.house, text: "Home" },
    { to: "", icon: icons.search, text: "Search" },
    { to: "/explore", icon: icons.explore, text: "Explore" },
    { to: "/reels", icon: icons.reels, text: "Reels" },
    { to: "/messages", icon: icons.chats, text: "Messages" },
    { to: "/notifications", icon: icons.notification, text: "Notifications" },
    { to: "/create", icon: icons.create, text: "Create" },
  ];

  // Function to handle menu click
  const handleMenuClick = (menu) => {
    if (menu === "Search") {
      setShowSearch((prev) => !prev); // Toggle the visibility of the search component
      setActiveMenu((prev) => (prev === "Search" ? "" : "Search")); // Toggle active menu
    } else {
      setActiveMenu(""); // Reset the state when other menus are clicked
      setShowSearch(false); // Hide search component
    }
  };
 
  function toProfile(){
    dispatch(toggleSearch({search : false}))
    dispatch(viewUser({viewUserId : selector.username }))
    navigate(`/${selector.username}`)
    
  }


  
  return (
    <div
      className="relative h-screen border-r border-dashed border-black"
      style={{ width: "16%" }}
    >
      <h2 className="pt-12 mx-8 font-bold text-lg">InstaConnect</h2>
      <div>
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="mx-8 text-black font-semibold text-lg mt-2 rounded p-3 transition-colors duration-200 hover:bg-gray-300 hover:cursor-pointer"
              onClick={() => handleMenuClick(item.text)} // Handle menu click
            >
              <NavLink to={item.to} className="flex items-center">
                <FontAwesomeIcon
                  className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500"
                  icon={item.icon}
                />
                {item.text}
              </NavLink>
            </li>
          ))}

          {/* Profile Menu Item */}
          <li className="mx-8 mt-2 text-black font-semibold text-lg rounded p-3 transition-colors duration-200 hover:bg-gray-300 hover:cursor-pointer">
            <NavLink
            onClick={toProfile}
            // Use the username dynamically from Redux store
              className="flex items-center"
            >
              <img
                src={profilePic}
                alt="Profile"
                style={{
                  width: "40px", // Ensure equal width and height
                  height: "40px",
                  borderRadius: "50%", // Makes the image circular
                  objectFit: "cover", // Ensures the image covers the container without stretching
                }}
                className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500"
              />
              Profile
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="mt-16 mx-8 hover:bg-gray-300 rounded p-3 transition-colors duration-200 hover:cursor-pointer">
        <PopupOver>
          <span className="p-3 text-2xl">
            <FontAwesomeIcon icon={icons.menu} /> Menu
          </span>
        </PopupOver>
      </div>

      {/* Conditionally render the Search component with animation */}
      <div
        className={`absolute top-0 left-full w-96 z-10 transition-transform ${
          showSearch ? "animate-slide-in-left" : "animate-slide-out-left"
        }`}
      >
        {showSearch && <Search />}
      </div>
    </div>
  );
}

export default LeftMenu;
