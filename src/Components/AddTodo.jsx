import React, { useRef } from "react";

const AddTodo = () => {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleResize = (ref) => {
    const textarea = ref.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  
  return (
    <div className="h-screen flex items-center justify-center">
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
          >
            Add task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
