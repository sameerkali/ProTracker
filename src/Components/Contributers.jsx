import React from "react";
import { contributors } from "../Utils";
import { Link } from "react-router-dom";

const Contributers = () => {
  return (
    <div className=" mt-20 px-[20rem]">
      <div className="flex">
        <Link to="/">
          <p className="underline">Home</p>
        </Link>
        <p>/</p>
        <p>Contributers</p>
      </div>
      <div className="">
        {contributors.map((contributor, index) =>
          <a
            key={index}
            href={contributor.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover rounded-full h-24 md:h-40 md:w-48 md:rounded-none md:rounded-t-lg"
              src={contributor.image}
              alt={contributor.name}
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                {contributor.name}
              </h5>
            </div>
          </a>
        )}
      </div>
    </div>
  );
};

export default Contributers;
