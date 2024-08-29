import React, { useDebugValue, useEffect, useState } from "react";
import { LeftMenu } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppwriteGet, getUserDetails, posts } from "../appwrite/appwrite";
import { profileImage, userdetails, login } from "../store/authSlice";
import InfiniteScroll from "react-infinite-scroll-component";
function Home() {
  const selector = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postImageUrl, setPostImageUrl] = useState([]);
  const [postCaption, setPostCaption] = useState([]);
  const [postAdmin, setPostAdmin] = useState([]);
  const [adminProfileUrl, setAdminProfileUrl] = useState([]);
  const [lastId, setLastId] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  //TODO: useEffect here to set the profile details from here
  //TODO: or just get profile Image

  useEffect(() => {
    async function getDetails() {
      if (selector.status && selector.userData) {
        const promise = await getUserDetails(selector.userData.email);
        if (
          promise.username !== selector.username ||
          promise.name !== selector.name ||
          promise.bio !== selector.bio ||
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
    if (
      !selector.username ||
      !selector.name ||
      !selector.bio ||
      !selector.databaseId
    ) {
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
    navigate,
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
          navigate("/");
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

  // fetch post from database
  //* 1st time post load
  // Fetch post from database
  async function LoadPost() {
    let promise = await posts("", 10);
    

    if (Array.isArray(promise.documents)) {
      // Get user profile images for all usernames
      const userProfileImagesPromises = promise.documents.map((doc) =>
        getUserDetails("", doc.username)
      );

      // Wait for all the Promises to resolve
      const userProfileImages = await Promise.all(userProfileImagesPromises);


      // Flatten the array and update state with the profile images
      setAdminProfileUrl((prev) => [...prev, ...userProfileImages.flat()]);

      // Loop through each document and update state
      promise.documents.forEach((doc) => {
        setPostImageUrl((prev) => [...prev, doc.postImage]);
        setPostCaption((prev) => [...prev, doc.caption]);
        setPostAdmin((prev) => [...prev, doc.username]);
        setLastId((prev) => [...prev, doc.$id]);
      });


      
      setHasMore(promise.documents.length >= 10);
    } else {
      console.error("Expected an array, but got:", promise);
    }
  }

  useEffect(() => {
    LoadPost();
  }, []);
  //* next post
  async function LoadNextPost() {
    let doc = lastId[lastId.length - 1];
    console.log("doc Id:" , doc);
     let promise = await posts(doc, 10);
     console.log("Next Post" , promise);
     
    if (Array.isArray(promise.documents)) {
      const userProfileImagesPromises = promise.documents.map((doc) =>
        getUserDetails("", doc.username)
      );

      // Wait for all the Promises to resolve
      const userProfileImages = await Promise.all(userProfileImagesPromises);
      

      // Flatten the array and update state with the profile images
      setAdminProfileUrl((prev) => [...prev, ...userProfileImages.flat()]);

      promise.documents.forEach((doc) => {
        setPostImageUrl((prev) => [...prev, doc.postImage]);
        setPostCaption((prev) => [...prev, doc.caption]);
        setPostAdmin((prev) => [...prev, doc.username]);
        setLastId((prev) => [...prev, doc.$id]);
      });
    } else {
      console.error("Expected an array, but got:", promise);
    }
    console.log(promise);

    if (promise.documents.length < 10) {
      setHasMore(false);
    } else setHasMore(true);
  }

  return (
    <div className="flex ">
      <LeftMenu />

      <div
        className="master absolute -z-10  ml-1/6 flex-1 overflow-y-auto"
        style={{ width: "84%", left: "16%" }}
      >
        <InfiniteScroll
          dataLength={posts.length}
          next={LoadNextPost}
          hasMore={hasMore}
          loader={<h4 className="text-center">Loading....</h4>}
          endMessage={<p className="text-center">No Posts</p>}
        >
          {postAdmin.map((name, index) => (
            <div
              key={index}
              className="flex z-10 justify-center centerIt w-full"
            >
              <div className="w-1/2 h-1/2 mx-auto m-3 ">
                <div className="w-full ml-20">
                  <div className="w-1/2 flex items-center my-3">
                    <img
                      src={adminProfileUrl[index]}
                      alt=""
                      style={{
                        width: "40px", // Ensure equal width and height
                        height: "40px",
                        borderRadius: "50%", // Makes the image circular
                        objectFit: "cover", // Ensures the image covers the container without stretching
                      }}
                      className=" text-gray-600 transition-colors duration-300 hover:text-blue-500"
                    />
                    <p className="font-semibold pb-2 px-2">{name}</p>
                    <p className="pb-2 pl-2 font-light">&#8226; 16h</p>
                  </div>
                  <div>
                    <img
                      src={postImageUrl[index]}
                      alt=""
                      className="object-cover rounded "
                      style={{ height: "48%", width: "72%" }}
                    />
                  </div>

                  <div>
                    <span className=" flex ">
                      <img
                        src="https://cloud.appwrite.io/v1/storage/buckets/66c806630009d6f49578/files/66cdfa0a000af490b6d1/view?project=66c5e76d001cda8b43ba&project=66c5e76d001cda8b43ba&mode=admin"
                        alt="Like"
                        className="w-7 h-7 mt-3 hover:cursor-pointer "
                      />
                      <img
                        src="https://cloud.appwrite.io/v1/storage/buckets/66c806630009d6f49578/files/66cdfab1000b5b7c835c/view?project=66c5e76d001cda8b43ba&project=66c5e76d001cda8b43ba&mode=admin"
                        alt="Like"
                        className="w-7 h-7 mt-3 hover:cursor-pointer mx-2"
                      />
                      <img
                        src="https://cloud.appwrite.io/v1/storage/buckets/66c806630009d6f49578/files/66cdfaf10011a64eb81c/view?project=66c5e76d001cda8b43ba&project=66c5e76d001cda8b43ba&mode=admin"
                        alt="Like"
                        className="w-7 h-7 mt-3 hover:cursor-pointer mx-2"
                      />
                    </span>
                    <span>
                      <p>1200 Likes</p>
                      <p style={{ whiteSpace: "pre-wrap" }}>{postCaption[index]}</p>
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-1/4 h-full bg-black"></div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Home;

// TODO: remove the search bar after clicking on any users profile
// * Rest is Rest
