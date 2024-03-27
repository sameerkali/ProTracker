import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import GoogleLogin from "./GoogleLogin";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { gradient } from "../assets/index";
import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleResize = ref => {
    const textarea = ref.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), snapshot => {
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const handleAddTodo = async () => {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;

    if (name.trim() !== "") {
      await addDoc(collection(db, "todos"), { name: name.trim(), description });
      setInputValue("");
      nameRef.current.value = "";
      descriptionRef.current.value = "";
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

  return (
    <div>
      <h1> This is Home Page</h1>
      <p>
        {user ? user.displayName : "no name"}
      </p>
      <p>
        {user ? user.email : "no email"}
      </p>
      {user && user.photoURL
        ? <img src={user.photoURL} alt="User" />
        : <img src={gradient} className="h-10 w-10" alt="User" />}
      <br />
      {token ? <button onClick={handleLogout}>LogOut</button> : <GoogleLogin />}

      {/* show todo */}
      <div className="flex justify-center">
        <ul className="w-[20rem] sm:w-[50rem]">
          {todos.map((todo, index) =>
            <li
              key={todo.id}
              className="flex items-center justify-between border-b border-gray-700 py-2"
            >
              {editIndex === index
                ? <div className="flex items-center">
                    <input
                      type="text"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      className="border border-transparent bg-[#6d6d6d2a] px-2 py-1 focus:outline-none mr-2 rounded-md"
                    />
                    <input
                      type="text"
                      value={editDescription}
                      onChange={e => setEditDescription(e.target.value)}
                      className="border border-transparent bg-[#6d6d6d2a] px-2 py-1 focus:outline-none mr-2 rounded-md"
                    />
                    <button
                      onClick={() =>
                        handleEditTodo(todo.id, {
                          name: editValue,
                          description: editDescription
                        })}
                        className="border border-gray-300 rounded-md px-[19px] py-[3px] mx-1 hover:bg-gray-800 hover:text-white"
            >
                      Update
                    </button>
                  </div>
                : <div>
                    <div className="text-[15px]">
                      {todo.data.name}
                    </div>
                    <div className="text-[12px]">
                      {todo.data.description}
                    </div>
                  </div>}
              <div className="flex ">
                <CiEdit
                  onClick={() => {
                    setEditIndex(index);
                    setEditValue(todo.data.name);
                    setEditDescription(todo.data.description);
                  }}
                  className="text-gray-400 cursor-pointer mx-1 hover:text-white text-xl"
                />
                <AiOutlineDelete
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-gray-400 cursor-pointer mx-3 hover:text-white text-xl"
                />
              </div>
            </li>
          )}
        </ul>
      </div>
      {/* show todo */}
      
      {/* add todo */}
      <div className="mt-10 flex items-center justify-center">
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
            <button
              type="submit"
              className="border border-gray-300 rounded-md px-[19px] py-[3px] mx-1 hover:bg-gray-800 hover:text-white"
            >
              Priority
            </button>
            <button
              type="submit"
              className="border border-gray-300 rounded-md px-[19px] py-[3px] mx-1 hover:bg-gray-800 hover:text-white"
            >
              label
            </button>
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
      {/* add todo */}
    </div>
  );
};

export default Home;
