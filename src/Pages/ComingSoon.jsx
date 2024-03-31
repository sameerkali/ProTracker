import React from "react";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <div className="flex flex-col h-[100vh] justify-center items-center">
    <h1 className="flex justify-center sm:text-[13rem] text-[3.5rem]">Coming Soon</h1>
      <p>
        This feature is cooking.{" "}
        <Link className="underline" to="/">
          Return Home
        </Link>
      </p>
    </div>
  );
};

export default ComingSoon;
