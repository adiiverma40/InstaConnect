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
  const [popUp, setPopUp] = useState(false);

  //Menu arry
  const menuItems = [
    { to: "/home", icon: icons.house, text: "Home" },
    { to: "/search", icon: icons.search, text: "Search" },
    { to: "/explore", icon: icons.explore, text: "Explore" },
    { to: "/reels", icon: icons.reels, text: "Reels" },
    { to: "/messages", icon: icons.chats, text: "Messages" },
    { to: "/notifications", icon: icons.notification, text: "Notifications" },
    { to: "/create", icon: icons.create, text: "Create" },
  ];

  function popUpfn() {
    setPopUp(true);
  }

  useEffect(() => {
    if (selector.profileImageUrl !== "") {
      setProfilePic(selector.profileImageUrl);
    } else {
      setProfilePic("https://placehold.co/400x400/000000/FFF");
    }
  }, [selector.status, selector.profileImageUrl, navigate]);

  return (
    <div className=" h-screen border-r border-dashed  border-black" style={{ width: "16%" }}>
      <h2 className="pt-12 mx-8 font-bold text-lg">InstaConnect</h2>
      <div>
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="mx-8 text-black font-semibold text-lg mt-2 rounded p-3 transition-colors duration-200 hover:bg-gray-300 hover:cursor-pointer"
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

          <li className="mx-8 mt-2  text-black font-semibold text-lg rounded p-3 transition-colors duration-200 hover:bg-gray-300 hover:cursor-pointer">
            <NavLink to={"/profile"} className="flex items-center">
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
      <div className="  mt-16 mx-8 hover:bg-gray-300  rounded p-3 transition-colors duration-200   hover:cursor-pointer">
        <PopupOver>
          <span className="p-3  text-2xl">
            <FontAwesomeIcon icon={icons.menu} /> Menu
          </span>
        </PopupOver>
      </div>
    </div>
  );
}

export default LeftMenu;
