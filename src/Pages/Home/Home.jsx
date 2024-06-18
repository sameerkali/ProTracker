import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onSnapshot, collection } from "firebase/firestore";
import Sidebar from "./Sidebar";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { db } from "../../firebase";
import { drawr } from "../../assets";
import ContributionGraph from "../../Components/ContributionGraph";

const auth = getAuth();

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="pr-4 pl-4 pb-4 sm:ml-64">
      {/* <ContributionGraph/> */}
        <div className="">
          <div className="mt-8" />
          <div className="flex flex-col mb-3">
            <h1 className="text-5xl flex justify-center">ProTracker</h1>
            <h1 className="text-[7px] flex justify-center tracking-[2px]">
              Domainte your goals today, With protracker
            </h1>
          </div>
          <TodoList todos={todos} user={user} />
          <TodoForm sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
      </div>
    </div>
  );
};

export default Home;
