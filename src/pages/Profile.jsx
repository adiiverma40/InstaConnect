// import React, { useEffect, useState } from "react";
// import { HeadlessButton, LeftMenu } from "../Components";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserProfile, getUserDetails } from "../appwrite/appwrite";
// import { profileImage, userdetails } from "../store/authSlice";

// function Profile() {
//   const [username, setUsername] = useState("");
//   const [bio, setBio] = useState("bio");
//   const [image, setImage] = useState("https://placehold.co/400x400/000000/FFF");
//   const [name, setName] = useState("");
//   const navigate = useNavigate();
//   const selector = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     async function userInfo() {
//       let promise = await getUserDetails(selector.userData.email);
//       console.log("calling get user details", promise);
//       dispatch(
//         userdetails({
//           username: promise.username,
//           bio: promise.bio,
//           id: promise.$id,
//           name: promise.name,
//         })
//       );
//       dispatch(
//         profileImage({
//           profileImageId: promise.profileImageId,
//           profileImageUrl: promise.profileImage,
//         })
//       );
//       setUsername(promise.username);
//       setBio(promise.bio);
//       setImage(promise.profileImage);
//       setName(promise.name);
//     }
//     async function searchUser() {
//       console.log("Search user");

//       const promise = await fetchUserProfile(selector.viewUserId);
//       console.log(promise);
//       setUsername(promise.username);
//       setBio(promise.bio);
//       setImage(promise.profileImage);
//       setName(promise.name);
//     }
//     if (selector.viewUserEmail === selector.userData.email) {
//       if (selector.username != "") {
//         setUsername(selector.username);
//         setBio(selector.bio);
//         setImage(selector.profileImageUrl);
//         setName(selector.name);
//       } else {
//         userInfo();
//       }
//     } else if (selector.viewUserEmail !== selector.userData.email) {
//       searchUser();
//     }
//   }, [navigate, selector.userData, selector.status]);

//   useEffect(() => {
//     console.log(username, name, bio, image);
//   }, []);
//   return (
//     <div className="flex">
//       <LeftMenu />
//       <div className="" style={{ width: "84%" }}>
//         <div className="flex pt-12 justify-center  w-full h-1/2">
//           <div className="mx-12">
//             <img
//               src={image}
//               className="w-40 h-40 object-cover rounded-full border-2 border-gray-300"
//               alt="Profile"
//             />
//           </div>

//           <div>
//             <div className="flex">
//               <p className="mr-3 text-lg">{username}</p>
//               <HeadlessButton
//                 onclick={() => navigate("/edit")}
//                 className="mx-1"
//                 text={"Edit Profile"}
//               />
//               <HeadlessButton
//                 onclick={() => navigate("/edit")}
//                 className="mx-1"
//                 text={"View Archive"}
//               />
//             </div>
//             <div className="flex ">
//               <p className=" mt-4 mb-4">8 Posts</p>
//               <p className="ml-10 mt-4 mb-4">9 Followers</p>
//               <p className="ml-10 mt-4 mb-4">23 Following</p>
//             </div>

//             <div>
//               <b>{name}</b>
//               <p style={{ whiteSpace: "pre-wrap" }}>{bio}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;


import React, { useEffect, useState } from "react";
import { HeadlessButton, LeftMenu } from "../Components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, getUserDetails } from "../appwrite/appwrite";
import { profileImage, userdetails } from "../store/authSlice";

function Profile() {
  const [username1, setUsername] = useState("");
  const [bio, setBio] = useState("bio");
  const [image, setImage] = useState("https://placehold.co/400x400/000000/FFF");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const selector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { username } = useParams(); // Capture the username from the URL

  useEffect(() => {
    async function userInfo() {
      let promise = await getUserDetails(selector.userData.email);
      console.log("calling get user details", promise);
      dispatch(
        userdetails({
          username: promise.username,
          bio: promise.bio,
          id: promise.$id,
          name: promise.name,
        })
      );
      dispatch(
        profileImage({
          profileImageId: promise.profileImageId,
          profileImageUrl: promise.profileImage,
        })
      );
      setUsername(promise.username);
      setBio(promise.bio);
      setImage(promise.profileImage);
      setName(promise.name);
    }

    async function searchUser() {
      console.log("Search user");
      const promise = await fetchUserProfile(selector.viewUserId);
      console.log(promise);
      setUsername(promise.username);
      setBio(promise.bio);
      setImage(promise.profileImage);
      setName(promise.name);
    }

    // If visiting your own profile
    if (username === selector.username) {
      if (selector.username !== "") {
        setUsername(selector.username);
        setBio(selector.bio);
        setImage(selector.profileImageUrl);
        setName(selector.name);
      } else {
        userInfo();
      }
    } else {
      console.log(username);
      
      // Visiting another user's profile
      searchUser();
    }
  }, [username, selector.userData, selector.username, selector.viewUserId]); // Add usernameParam to the dependencies

  useEffect(() => {
    console.log(username, name, bio, image);
  }, [username, name, bio, image]);

  return (
    <div className="flex">
      <LeftMenu />
      <div className="" style={{ width: "84%" }}>
        <div className="flex pt-12 justify-center w-full h-1/2">
          <div className="mx-12">
            <img
              src={image}
              className="w-40 h-40 object-cover rounded-full border-2 border-gray-300"
              alt="Profile"
            />
          </div>

          <div>
            <div className="flex">
              <p className="mr-3 text-lg">{username1}</p>
              <HeadlessButton
                onclick={() => navigate("/edit")}
                className="mx-1"
                text={"Edit Profile"}
              />
              <HeadlessButton
                onclick={() => navigate("/edit")}
                className="mx-1"
                text={"View Archive"}
              />
            </div>
            <div className="flex ">
              <p className="mt-4 mb-4">8 Posts</p>
              <p className="ml-10 mt-4 mb-4">9 Followers</p>
              <p className="ml-10 mt-4 mb-4">23 Following</p>
            </div>

            <div>
              <b>{name}</b>
              <p style={{ whiteSpace: "pre-wrap" }}>{bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
