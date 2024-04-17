import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, user }) => {
  return (
    <div className="flex justify-center">
      <ul className="w-[20rem] sm:w-[50rem]">
        <div className="w-[20rem] sm:w-[50rem] h-[28rem] sm:h-[20rem] overflow-y-auto" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
          {todos.map((todo, index) => (
            <TodoItem key={todo.id} todo={todo} index={index} user={user} />
          ))}
        </div>
      </ul>
    </div>
  );
};

export default TodoList;
