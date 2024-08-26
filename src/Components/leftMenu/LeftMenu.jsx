import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "./icons";
import { useDispatch, useSelector } from "react-redux";
import PopupOver from "../PopupOver";
import Search from "../../pages/Search";
import { toggleSearch, viewUser } from "../../store/authSlice";
import { CreatePost } from "../../pages";

function LeftMenu() {
  const selector = useSelector((state) => state.auth);
  const [profilePic, setProfilePic] = useState("");
  const [activeMenu, setActiveMenu] = useState(""); // State to track the active menu
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const [createPost, setCreatePost] = useState(false);
  

  useEffect(() => {


    if (selector.isSearch) {
      setShowSearch(true);
   
    } else {
      setShowSearch(false);
 
    }
  }, [selector.isSearch]);

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
    { to: "", icon: icons.create, text: "Create" },
  ];

  const handleMenuClick = (menu) => {
  

    if (menu === "Search") {
      dispatch(toggleSearch({ search: !selector.isSearch })); // Toggle the search state in Redux
    } else if (menu === "Create") {

      setCreatePost(true);
    } else {
      // Reset the search state when any other menu is clicked
      if (selector.isSearch) dispatch(toggleSearch({ search: false }));
    }
  };

  function toProfile() {
    dispatch(toggleSearch({ search: false }));
    dispatch(viewUser({ viewUserId: selector.username }));
    navigate(`/${selector.username}`);
  }
  function closeCreate(){
    setCreatePost(false)
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

      <div
        className={`absolute top-0 left-full w-96 z-10 transition-transform ${
          selector.isSearch ? "animate-slide-in-left" : "animate-slide-out-left"
        }`}
      >
        {selector.isSearch && <Search />}
      </div>

      {createPost && (
        <div className="absolute top-0 left-0 w-screen h-screen backdrop-blur flex items-center inset-0 flexitems-center justify-center border border-red-500">
          <span className="text-2xl hover:cursor-pointer absolute top-10 " onClick={closeCreate} style={{left:'85%'}}>X</span>
          <CreatePost create={createPost}/>
        </div>
      )}
    </div>
  );
}


//TODO: Navigating to /create due to pramas, solve the issue
export default LeftMenu;
