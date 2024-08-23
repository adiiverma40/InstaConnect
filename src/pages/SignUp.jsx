import React , {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux"
import {login, logout, profileImage, userdetails} from "../store/authSlice"
import { NavLink, useNavigate } from "react-router-dom";
import { Input, Button } from "../Components/index";
import { useForm } from "react-hook-form";
import {AppwriteSignUp, AppwriteUpdateName, createUserDetails, AppwriteGet} from "../appwrite/appwrite"
function SignUp() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state.auth)
  async function createUser(data) {
    let promise = await AppwriteSignUp(data.email , data.password)
    let updateName = await AppwriteUpdateName(data.name)
    let updateDetails = await createUserDetails(data.username , "", data.email)
    console.log("username changed :" , updateDetails );
    dispatch(profileImage({profileImageId : "" , profileImageUrl:""}))

    if(updateName){
      dispatch((login({userData : promise})))

      navigate("/home")
    }
    
  }
  
  useEffect(()=>{
    async function checkLogin() {
      const Promise = await AppwriteGet()
      if(Promise){
        dispatch(login({userData: Promise}))
        navigate('/home')
      }
    }
    checkLogin()
    console.log("checked login")
},[navigate, selector.status , selector.userData])


  return (
    <>
      <div
        className="border-2  border-black h-2/3 rounded-md flex items-center justify-center bg-white absolute "
        style={{ width: "28% ", top: "5%", left: "33%" }}
      >
        <div className="w-full h-full">
          <h2 className="text-center font-bold pb-8 pt-12 text-xl ">
            InstaConnect
          </h2>
          <form onSubmit={handleSubmit(createUser)} className="mx-10 h-full w-full">
              <Input
               placeholder="Enter Full Name"
               {...register("name", { required: true })}
             />
              <Input
              placeholder="Enter Username"
              {...register("username", { required: true })}
            />
          <Input
              placeholder="Enter Email"
              {...register("email", { required: true })}
            />
            <Input
              placeholder="Enter Password"
              {...register("password", { required: true })}
            />
            <Button type="submit">Sign Up</Button>
          </form>
        </div>
      </div>
      <div
        className="border-2  border-black rounded-md flex items-center justify-center bg-white absolute "
        style={{ width: "28% ", top: "74%", left: "33%", height: "8%" }}
      >
        <p>
          Have an account?{" "}
          <span className="text-blue-600 cursor-pointer">
            <NavLink to={"/"}>Login</NavLink>
          </span>
        </p>
      </div>
    </>
  );
}

export default SignUp;
