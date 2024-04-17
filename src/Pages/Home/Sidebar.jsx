import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { close, drawr, five, four, one, six, three, two } from "../../assets";
import Profile from "../../Components/profile";
import Logout from "../../Components/Logout";

const Sidebar = ({sidebarOpen, setSidebarOpen}) => {
    // console.log(sidebarOpen)
//   const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <aside
        id="cta-button-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen
          ? ""
          : "-translate-x-full"} sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <div className="flex justify-end">
                <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                  <img src={drawr} />
                </button>
              </div>
            </li>
            <li className="flex justify-start">
              <Profile />
            </li>
            <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <Link to={`comingsoon`}>
                {/* two */}
                <div className="flex ">
                  <img className="h-5" src={one} />
                  <div className="flex">
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Your Progress
                    </span>
                  </div>
                  <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    🔥
                  </span>
                </div>
              </Link>
            </li>
            <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <Link to={`comingsoon`}>
                {/* two */}
                <div className="flex ">
                  <img className="h-5" src={two} />
                  <div className="flex">
                    <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      69
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <Link to={`comingsoon`}>
                {/* two */}
                <div className="flex ">
                  <img className="h-5" src={three} />
                  <div className="flex">
                    <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/sameerkali/ProTracker"
                target="_blank"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {/* four */}
                {/* <img className="h-5" src={four} /> */}
                <FaGithub size={23} />
                <span className="flex-1 ms-3 whitespace-nowrap">GiHhub</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {/* five */}
                <img className="h-5 " src={five} />
                <div className="ml-2" />
                <Logout />
              </a>
            </li>
          </ul>
          <div
            id="dropdown-cta"
            className="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900"
            role="alert"
          >
            <div className="flex items-center mb-3">
              <span className="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
                Beta
              </span>
              <button
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-6 h-6 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
                data-dismiss-target="#dropdown-cta"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <img src={close} />
              </button>
            </div>
            <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
              The platform for handling your tasks with ProTracker to visualize
              your performance on a daily, weekly, monthly, and yearly basis.
            </p>
            <a
            target="_blank"
              className="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
              href="https://github.com/sameerkali/ProTracker"
            >
              Know more about this app
            </a>
          </div>
          <h1 className="text-yellow-600 mt-10">
            This app is totally Open Source if you are a developer feel free to
            contribute{" "}
          </h1>
          <Link to="/contributers">
            <h1 className="underline text-green-600">Contributers</h1>
          </Link>
        </div>
      </aside>
  );
};

export default Sidebar;
