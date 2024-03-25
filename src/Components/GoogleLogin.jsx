import React from "react";
import { auth, googleAuthProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import {  useNavigate } from "react-router-dom";

const GoogleLogin = () => {
    const navigate = useNavigate()
  const handleClick = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      console.log(result.user);
      localStorage.setItem("token", result.user.accessToken);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/");
    } catch (error) {
      console.log("Google Login error 🦓🦓🦓🦓 : ",error);
    }
  };

  return <button className="bg-red-400 text-white" onClick={handleClick}>Google</button>;
};

export default GoogleLogin;
