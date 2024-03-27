import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { google, gradient } from "../assets/index";

const Home = () => {
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
    <div>
      <h1> This is Home Page</h1>
      <p>
        {user ? user.displayName : "no name"}
      </p>
      <p>
        {user ? user.email : "no email"}
      </p>
      {user && user.photoURL
        ? <img src={user.photoURL} alt="User" />
        : <img src={gradient} className="h-10 w-10" alt="User" />}
      <br />
      {token ? <button onClick={handleLogout}>LogOut</button> : <GoogleLogin />}

      <div className="drawer">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
    <h1 className="items-center">sameer</h1>
      {/* Sidebar content here */}
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
      <li>{token ? (
        <button onClick={handleLogout}>LogOut</button>
      ) : (
        <GoogleLogin />
      )}</li>
      
    </ul>
  </div>
</div>
    </div>
  );
};

export default Home;
