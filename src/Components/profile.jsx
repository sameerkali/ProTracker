import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { gradient } from "../assets/index";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

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
    <div className="flex items-center flex-col">
      <div className="flex justify-center items-center gap-4">
        {user && user.photoURL ? (
          <img className="rounded-full h-14" src={user.photoURL} alt="User" />
        ) : (
          <img className="rounded-full h-10 w-10" src={gradient} alt="User" />
        )}
        <div>
          <p>{user ? user.displayName : "no name"}</p>
          <p>{user ? user.email : "no email"}</p>
        </div>
      </div>

      {token ? (
        <button
          className="bg-gray-800 text-white px-3 py-1 rounded-md mt-4 hover:bg-gray-700"
          onClick={handleLogout}
        >
          LogOut
        </button>
      ) : (
        <GoogleLogin />
      )}
    </div>
  );
};

export default Profile;
