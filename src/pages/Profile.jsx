import React, { useEffect, useState } from "react";
import { HeadlessButton, LeftMenu, UserDiv } from "../Components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppwriteGet,
  checkFollowStatus,
  fetchUserProfile,
  followerList,
  followFollowing,
  followingList,
  getUserDetails,
  unfollowUser,
} from "../appwrite/appwrite";
import { profileImage, userdetails , login} from "../store/authSlice";

function Profile() {
  const [username1, setUsername] = useState("");
  const [bio, setBio] = useState("bio");
  const [image, setImage] = useState("https://placehold.co/400x400/000000/FFF");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const selector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { username } = useParams(); 
  const [isFollow, SetIsFollow] = useState(false);
  const [showFollower, setShowFollower] = useState(false);
  const [showUsersArray, setShowUsersArray] = useState([]);
  const [header, setHeader] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [documentId , setDocumentId] = useState('')
  const [followers , setFollower] = useState(0)
  const [following , setFollowing] = useState(0)
  useEffect(() => {
    async function checkLogin() {
      try {
        const promise = await AppwriteGet();
        if (promise) {
          dispatch(login({ userData: promise }));
        } else {
          console.log("Else");
          
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
  

  useEffect(() => {
    async function fetchFollowStatus() {
      try {
        const status = await checkFollowStatus(selector.username, username);
        if (status.documents.length > 0) {
          setDocumentId(status.documents[0].$id);  
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      } catch (error) {
        console.error('Error fetching follow status:', error);
      }
    }
    if (selector.username && username) {
      fetchFollowStatus();
    }
  }, [selector.username, username]);
  

  useEffect(()=>{
    async function followersFollowing() {
      let following = await followingList(username)
      let follower = await followerList(username)
      setFollower(follower.documents.length)
      setFollowing(following.documents.length)
    }
    followersFollowing()
  },[navigate , username, bio , profileImage ,isFollowing])

  useEffect(() => {
    async function userInfo() {
      let promise = await getUserDetails(selector.userData.email);
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
      const promise = await fetchUserProfile(selector.viewUserId);
      setUsername(promise.username);
      setBio(promise.bio);
      setImage(promise.profileImage);
      setName(promise.name);
  
    }

    // If visiting your own profile
    if (username === selector.username) {
      SetIsFollow(false);
      if (selector.username !== "") {
        setUsername(selector.username);
        setBio(selector.bio);
        setImage(selector.profileImageUrl);
        setName(selector.name);
      } else {
        userInfo();
      }
    } else {
      SetIsFollow(true);
      // Visiting another user's profile
      searchUser();
    }
  }, [username, selector.userData, selector.username, selector.viewUserId]); // Add usernameParam to the dependencies

  async function followUser() {
    let promise = await followFollowing(selector.username, username);
    setIsFollowing(true)
  }

  async function showFollowerFn() {
    setShowFollower(true);
    setHeader("Follower");
    let promise = await followerList(username);
    setShowUsersArray(promise.documents);
  }
  async function showFollowingFn() {
    setShowFollower(true);
    setHeader("Following");
    let promise = await followingList(username);
    setShowUsersArray(promise.documents);
  }
  function onClose() {
    setShowFollower(false);
  }
  async function unfollowUserFn(){
    let promise = await unfollowUser(documentId)
    setIsFollowing(false)
    
  }


  useEffect(()=>{

  }, [])

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
              {!isFollow ? (
                <>
                  <HeadlessButton
                    onclick={() => navigate("/edit")}
                    className="mx-1"
                    text={"Edit Profile"}
                  />
                  <HeadlessButton
                    onclick={() => navigate("/archive")}
                    className="mx-1"
                    text={"View Archive"}
                  />
                </>
              ) : (
                <>
                  {isFollowing ? (
                    <HeadlessButton
                      onclick={unfollowUserFn}
                      className="mx-1"
                      text={"Unfollow"}
                    />
                    
                  ) : (
                    <HeadlessButton
                      onclick={followUser}
                      className="mx-1"
                      text={"Follow"}
                    />
                  )}
                   <HeadlessButton
                      className="mx-1"
                      text={"Message"}
                    />
                </>
              )}
            </div>
            <div className="flex ">
              <p className="mt-4 mb-4 hover:cursor-pointer">8 Posts</p>
              <p
                className="ml-10 mt-4 mb-4 hover:cursor-pointer"
                onClick={showFollowerFn}
              >
                {followers} Followers
              </p>
              <p
                className="ml-10 mt-4 mb-4 hover:cursor-pointer"
                onClick={showFollowingFn}
              >
                {following} Following
              </p>
            </div>

            <div>
              <b>{name}</b>
              <p style={{ whiteSpace: "pre-wrap" }}>{bio}</p>
            </div>
          </div>
        </div>
      </div>
      {showFollower && (
        <UserDiv
          onClose={onClose}
          header={header}
          username={username}
          users={showUsersArray}
        />
      )}
    </div>
  );
}

export default Profile;
