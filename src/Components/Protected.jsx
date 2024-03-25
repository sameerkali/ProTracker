import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  return (
    <div>
      <p> I am protected</p>
      <Link to="/login">back to login</Link>
    </div>
  );
};

export default Protected;
