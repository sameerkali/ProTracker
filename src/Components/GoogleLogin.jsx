import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { google } from "../assets";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setIsLoading(true); // Set loading state to display spinner
    setError(null); // Clear any previous errors

    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      console.log(result.user);
      localStorage.setItem("token", result.user.accessToken);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/");
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false); // Ensure spinner is hidden even on errors
    }
  };

  return (
    <div className="cursor-pointer">
      {isLoading ? (
        <img className="h-14 animate-spin" src={google} alt="google icon" />
      ) : (
        <img onClick={handleClick} className="h-14" src={google} alt="google icon" />
      )}
    </div>
  );
};

export default GoogleLogin;
