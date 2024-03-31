import React from "react";
import { Link } from "react-router-dom";
import { contributors } from "../Utils";

const Contributers = () => {
  return (
    <div className="h-screen border border-black m-0 flex justify-center items-center overflow-x-auto flex-col">
      <div className="flex my-10">
      <Link to="/">

        <p className="underline">home</p>
      </Link>
        <p>/</p>
        <p className="text-gray-400">contributers</p>
      </div>
      <table className="border-collapse">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-black px-4 py-2">Image</th>
            <th className="border border-black px-4 py-2">Name</th>
            <th className="border border-black px-4 py-2">GitHub</th>
          </tr>
        </thead>
        <tbody>
          {contributors.map((contributor, index) =>
            <tr className="bg-gray-700" key={index}>
              <td className="border border-black px-4 py-2">
                <img
                  src={contributor.image}
                  alt={contributor.name}
                  className="h-10 w-10 rounded-full"
                />
              </td>
              <td className="border border-black px-4 py-2">
                {contributor.name}
              </td>
              <td className="border border-black px-4 py-2">
                <a
                  href={contributor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </a>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Contributers;
