import { useState } from "react";
import { getProfileImage } from "./appwrite/appwrite";
import { profileImage } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);
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
    <>
      <Outlet />
    </>
  );
}

export default App;
