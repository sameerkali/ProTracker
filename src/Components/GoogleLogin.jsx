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
    <div>
      {/* <button
        type="submit"
        className=" mt-4 sm:w-[14rem] border rounded-md p-3 border-gray-600 w-[14rem] mr-4"
         onClick={handleClick}
      >
        Google
      </button> */}
      <img onClick={handleClick} src={google} alt='google icon' />
    </div>
  );
};

export default GoogleLogin;
