import React, { useState, useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import Calendar from "react-calendar";

const TodoForm = (sidebarOpen, setSidebarOpen) => {


  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const [isLabelDropdownOpen, setIsLabelDropdownOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  
  const handleResize = ref => {
    const textarea = ref.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleAddTodo = async () => {
    const user = await JSON.parse(localStorage.getItem("user"));
    if (user && user.uid) {
      const name = nameRef.current.value;
      const description = descriptionRef.current.value;
      const currentDate = new Date(); // Get the current date and time

      if (name.trim() !== "") {
        await addDoc(collection(db, "todos"), {
          name: name.trim(),
          description,
          isCompleted: false,
          priority: selectedPriority || "",
          label: selectedLabel || "",
          date: currentDate, // Save the current date and time
          userUID: user.uid
        });
        nameRef.current.value = "";
        descriptionRef.current.value = "";
        setSelectedPriority("");
        setSelectedLabel("");
      } else {
        console.error("Task name cannot be empty");
      }
    } else {
      console.error("User data not found or incomplete");
    }
  };
  



  return (
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
  );
};

export default TodoForm;
