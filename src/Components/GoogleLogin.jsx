import React from "react";
import { auth, googleAuthProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { google } from "../assets";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      console.log(result.user);
      localStorage.setItem("token", result.user.accessToken);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/");
    } catch (error) {
      console.log("Google Login error 🦓🦓🦓🦓 : ", error);
    }
  };

  return (
    <div className="cursor-pointer">
      <img onClick={handleClick} src={google} alt='google icon' />
    </div>
  );
};

export default GoogleLogin;
