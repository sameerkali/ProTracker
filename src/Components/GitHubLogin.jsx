import React from "react";
import { auth, googleAuthProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { github } from "../assets";

const GitHubLogin = () => {
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
      <img onClick={handleClick} className="h-14" src={github} alt="github icon" />
    </div>
  );
};

export default GitHubLogin;
