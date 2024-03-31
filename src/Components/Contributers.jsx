import React from "react";
import { drawr } from "../assets";
import { contributors } from "../Utils";

const Contributers = () => {
  return (
    <div className="">
      {contributors.map((user, index) =>
        <div key={index} className="text-center mx-4 flex flex-col">
          <img className="h-10" src={drawr} alt={user.name} />
          <div className=" flex">
            <p>
              {user.name}
            </p>
            <a href={user.link} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contributers;
