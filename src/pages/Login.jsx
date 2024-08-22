import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import {login} from "../store/authSlice"
import { NavLink, useNavigate } from "react-router-dom";
import { Input, Button } from "../Components/index";
import { useForm } from "react-hook-form";
import { AppwriteGet, AppwriteLogin } from "../appwrite/appwrite";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state.auth)
  async function Login(data) {
    console.log(data);
    let promise = await AppwriteLogin(data.email, data.password);
    if (promise) {
      console.log(promise);
      dispatch(login({userData: promise}))
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
        className="border-2  border-black h-2/4 rounded-md flex items-center justify-center bg-white absolute "
        style={{ width: "31% ", top: "21%", left: "33%" }}
      >
        <div className="w-full h-full">
          <h2 className="text-center font-bold pb-8 pt-12 text-xl ">
            InstaConnect
          </h2>
          <form onSubmit={handleSubmit(Login)} className="mx-10 h-full w-full">
            <Input
              placeholder="Enter Email"
              {...register("email", { required: true })}
            />
            <Input
              placeholder="Enter Password"
              {...register("password", { required: true })}
            />
            <Button type="submit">Log in</Button>
          </form>
        </div>
      </div>
      <div
        className="border-2  border-black rounded-md flex items-center justify-center bg-white absolute "
        style={{ width: "31% ", top: "74%", left: "33%", height: "8%" }}
      >
        <p>
          Don't have account?{" "}
          <span className="text-blue-600 cursor-pointer">
            <NavLink to={"/signup"}>Sign Up</NavLink>
          </span>
        </p>
      </div>
    </>
  );
}

export default Login;
