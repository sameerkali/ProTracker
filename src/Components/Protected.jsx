import React from "react";
import { Outlet, Link } from "react-router-dom";

const Protected = () => {
  return (
    <div>
      <p>I am protected</p>
      <Link to="/login">Back to login</Link>
      <Outlet />
    </div>
  );
};

export default Protected;