import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const TodoItem = ({ todo, index, user }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState(todo.data.name);
  const [editDescription, setEditDescription] = useState(todo.data.description);

  const handleEditTodo = async () => {
    await updateDoc(doc(db, "todos", todo.id), {
      name: editValue,
      description: editDescription
    });
    setEditIndex(null);
  };

  const handleCheckboxChange = async (id, isCompleted) => {
    await updateDoc(doc(db, "todos", id), { isCompleted: !isCompleted });
  };

  const handleDeleteTodo = async () => {
    await deleteDoc(doc(db, "todos", todo.id));
  };

  const formatDate = (dateObj) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div>
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
                  onChange={e => setEditDescription(e.target.value)}
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
                <div className="flex text-[10px]  gap-8">
                  <p className="text-yellow-400">
                    {todo.data.priority}
                  </p>
                  <p className="text-purple-600">
                    {todo.data.label}
                  </p>
                </div>
                <div className="flex  gap-7">
                  <input
                    type="checkbox"
                    value={todo.data.isCompleted}
                    checked={todo.data.isCompleted}
                    onChange={() =>
                      handleCheckboxChange(todo.id, todo.data.isCompleted)}
                    className="checkbox checkbox-success theme-controller"
                  />
                  <div className="">
                    <div
                      className={`text-[15px] ${todo.data.isCompleted
                        ? "text-green-500"
                        : ""}`}
                    >
                      {todo.data.name}
                    </div>
                    <div
                      className={`text-[12px] ${todo.data.isCompleted
                        ? "text-green-500"
                        : ""}`}
                    >
                      {todo.data.description}
                    </div>
                    <div
                      className={`text-[12px] ${todo.data.isCompleted
                        ? ""
                        : "text-green-500"}`}
                    >
                      {formatDate(todo.data.date.toDate())}
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
              className="text-gray-400 cursor-pointer mx-3 hover:text-red-400 text-xl"
            />
          </div>
        </li>}
    </div>
  );
};

export default TodoItem;