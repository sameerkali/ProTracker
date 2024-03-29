import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col h-[100vh] justify-center items-center">
    <h1 className="sm:text-[13rem] text-[5rem]">Error 404</h1>
      <p>
        Page Not Found.{" "}
        <Link className="underline" to="/">
          Return Home
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
