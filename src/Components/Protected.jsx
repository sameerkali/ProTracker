import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  return (
    <div>
      {true ? <Outlet /> : <Navigate to="/login" />}
    </div>
  );
};

export default Protected;
