import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Logout = () => {
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className={`text-${theme === "light" ? "black" : "white"}`} onClick={handleLogout}>
      LogOut
    </button>
  );
};

export default Logout;
