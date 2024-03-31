import React, { useState, useEffect, useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";

import { Link } from "react-router-dom";

import { CiEdit } from "react-icons/ci";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";
import Profile from "../Components/profile";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { close, drawr, five, four, one, six, three, two } from "../assets";
import Logout from "../Components/Logout";
const auth = getAuth();

const Home = () => {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const [isLabelDropdownOpen, setIsLabelDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for toggling sidebar

  const handleResize = ref => {
    const textarea = ref.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), snapshot => {
      const sortedTodos = snapshot.docs
        .map(doc => ({ id: doc.id, data: doc.data() }))
        .sort((a, b) => b.data.date - a.data.date); // Sort by date in descending order
      setTodos(sortedTodos);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTodo = async () => {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const currentDate = new Date();

    if (name.trim() !== "") {
      await addDoc(collection(db, "todos"), {
        name: name.trim(),
        description,
        isCompleted: false,
        priority: selectedPriority || "",
        label: selectedLabel || "",
        date: currentDate,
        userUID: user.uid
      });
      nameRef.current.value = "";
      descriptionRef.current.value = "";
      setSelectedPriority("");
      setSelectedLabel("");
    }
  };

  const handleEditTodo = async (id, newData) => {
    await updateDoc(doc(db, "todos", id), newData);
    setEditIndex(null);
    setEditValue("");
    setEditDescription("");
  };

  const handleDeleteTodo = async id => {
    await deleteDoc(doc(db, "todos", id));
  };

  const handleCheckboxChange = async (id, isCompleted) => {
    await updateDoc(doc(db, "todos", id), { isCompleted: !isCompleted });
  };

  // user logic
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    });

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    return () => unsubscribe();
  }, []);
  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <span className="loading loading-dots loading-lg" />
      </div>
    );
  }

  return (
    <div>
      <button
        data-drawer-target="cta-button-sidebar"
        data-drawer-toggle="cta-button-sidebar"
        aria-controls="cta-button-sidebar"
        type="button"
        onClick={() => setSidebarOpen(!sidebarOpen)} // Toggle sidebar
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <img src={drawr} />
      </button>
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
              className="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
              href="#"
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
      <div className="pr-4 pl-4 pb-4  sm:ml-64">
        {/* paste your content herer */}
        <div className="">
          <div className="mt-8" />
          <div className="flex flex-col mb-3">
            <h1 className="text-5xl flex justify-center">ProTracker</h1>
            <h1 className="text-[7px] flex justify-center tracking-[2px]">
              Domainte your goals today, With protracker
            </h1>
          </div>
          <div className="flex justify-center">
            <ul className="w-[20rem] sm:w-[50rem]">
              <div
                className="w-[20rem] sm:w-[50rem] h-[28rem] sm:h-[20rem] overflow-y-auto"
                style={{
                  scrollbarWidth: "none",
                  WebkitOverflowScrolling: "touch"
                }}
              >
                {todos.map((todo, index) =>
                  <div key={todo.id}>
                    {todo.data.userUID === user.uid &&
                      <li className="flex items-center justify-between border-b border-gray-700 py-2">
                        {editIndex === index
                          ? <div className="sm:flex-row flex-col items-center ">
                              <input
                                type="text"
                                value={editValue}
                                onChange={e => setEditValue(e.target.value)}
                                className="border border-transparent bg-[#6d6d6d2a] px-2 py-1 focus:outline-none mr-2 rounded-md mt-3 sm:mt-0"
                              />
                              <input
                                type="text"
                                value={editDescription}
                                onChange={e =>
                                  setEditDescription(e.target.value)}
                                className="border border-transparent bg-[#6d6d6d2a] px-2 py-1 focus:outline-none mr-2 rounded-md mt-3 sm:mt-0"
                              />
                              <button
                                onClick={() =>
                                  handleEditTodo(todo.id, {
                                    name: editValue,
                                    description: editDescription
                                  })}
                                className="border border-gray-300 rounded-md px-[19px] py-[3px] mx-1 hover:bg-gray-800 hover:text-white mt-3 sm:mt-0"
                              >
                                Update
                              </button>
                            </div>
                          : <div className="flex flex-col gap-2">
                              {/* label & priority */}
                              <div className="flex text-[10px]  gap-8">
                                <p className="text-yellow-400">
                                  {todo.data.priority}
                                </p>
                                <p className="text-purple-600">
                                  {todo.data.label}
                                </p>
                              </div>
                              {/* label & priority */}
                              <div className="flex  gap-7">
                                <input
                                  type="checkbox"
                                  value={todo.data.isCompleted}
                                  checked={todo.data.isCompleted}
                                  onChange={() =>
                                    handleCheckboxChange(
                                      todo.id,
                                      todo.data.isCompleted
                                    )}
                                  className="checkbox checkbox-success theme-controller"
                                />
                                <div className="">
                                  <div
                                    className={`text-[15px] ${todo.data
                                      .isCompleted
                                      ? "text-green-500"
                                      : ""}`}
                                  >
                                    {todo.data.name}
                                  </div>
                                  <div
                                    className={`text-[12px] ${todo.data
                                      .isCompleted
                                      ? "text-green-500"
                                      : ""}`}
                                  >
                                    {todo.data.description}
                                  </div>
                                </div>
                              </div>
                            </div>}

                        <div className="flex">
                          <CiEdit
                            onClick={() => {
                              setEditIndex(index);
                              setEditValue(todo.data.name);
                              setEditDescription(todo.data.description);
                            }}
                            className="text-gray-400 cursor-pointer mx-1 hover:text-green-400 text-xl"
                          />
                          <AiOutlineDelete
                            onClick={() => handleDeleteTodo(todo.id)}
                            className="text-gray-400 cursor-pointer mx-3 hover:text-red-300 text-xl"
                          />
                        </div>
                      </li>}
                  </div>
                )}
              </div>
            </ul>
          </div>
          <div className="my-4 flex items-center justify-center">
            <div className=" w-[20rem] sm:w-[53rem] border border-gray-300 rounded-lg flex flex-col ">
              <div className="flex flex-col px-4 pt-4">
                <textarea
                  ref={nameRef}
                  className="bg-transparent text-14 font-bold outline-none overflow-hidden resize-none w-full"
                  placeholder="Task name"
                  onInput={() => handleResize(descriptionRef)}
                />
                <textarea
                  ref={descriptionRef}
                  onInput={() => handleResize(descriptionRef)}
                  className=" bg-transparent placeholder-gray-500  text-[14px] outline-none overflow-hidden resize-none w-full mb-4"
                  placeholder="Description"
                />
              </div>
              <div className="felx flex-col px-3 pb-3 text-[13px] ">
                <button
                  type="submit"
                  className="border border-gray-300 rounded-md mx-1 px-[19px] py-[3px] hover:bg-gray-800 hover:text-white"
                >
                  Due date
                </button>
                <div className="dropdown dropdown-hover">
                  <button
                    tabIndex={0}
                    role="button"
                    type="submit"
                    className="border border-gray-300 rounded-md px-[19px] py-[3px] mx-1 hover:bg-gray-800 hover:text-white"
                    onClick={() =>
                      setIsPriorityDropdownOpen(!isPriorityDropdownOpen)}
                  >
                    Priority
                    <ul
                      tabIndex={0}
                      className={`dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-1 ${isPriorityDropdownOpen
                        ? "block"
                        : "hidden"}`}
                    >
                      <li>
                        <a
                          onClick={() => {
                            setSelectedPriority("High");
                            setIsPriorityDropdownOpen(false);
                          }}
                        >
                          High🔥
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            setSelectedPriority("Medium");
                            setIsPriorityDropdownOpen(false);
                          }}
                        >
                          Medium🌚
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            setSelectedPriority("Low");
                            setIsPriorityDropdownOpen(false);
                          }}
                        >
                          Low🥲
                        </a>
                      </li>
                    </ul>
                  </button>
                </div>
                <div className="dropdown dropdown-hover">
                  <button
                    tabIndex={0}
                    role="button"
                    type="submit"
                    className="border border-gray-300 rounded-md px-[19px] py-[3px] mx-1 hover:bg-gray-800 hover:text-white"
                    onClick={() => setIsLabelDropdownOpen(!isLabelDropdownOpen)}
                  >
                    Label
                    <ul
                      tabIndex={0}
                      className={`dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-1 ${isLabelDropdownOpen
                        ? "block"
                        : "hidden"}`}
                    >
                      <li>
                        <a
                          onClick={() => {
                            setSelectedLabel("Personal");
                            setIsLabelDropdownOpen(false);
                          }}
                        >
                          Personal🦉
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            setSelectedLabel("Work");
                            setIsLabelDropdownOpen(false);
                          }}
                        >
                          Work🦄
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            setSelectedLabel("Study");
                            setIsLabelDropdownOpen(false);
                          }}
                        >
                          Study🦤
                        </a>
                      </li>
                    </ul>
                  </button>
                </div>
              </div>
              <hr />
              <div className="flex justify-end px-3 text-[13px] py-4">
                <button
                  type="submit"
                  className="border border-gray-300 rounded-md px-[19px] py-[3px] mx-1 hover:bg-gray-800 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border border-gray-300 rounded-md px-[19px] py-[3px] mx-1 hover:bg-gray-800 hover:text-white"
                  onClick={handleAddTodo}
                >
                  Add task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
