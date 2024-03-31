
import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import AddTodo from "./Components/AddTodo";
import LogInForm from "./Pages/LogInForm";
import SignUpForm from "./Pages/SignUpForm";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProfileCode from "./Pages/ProfileCode";
import Drawr from "./Components/Drawr";
import ComingSoon from "./Pages/ComingSoon";
import Contributers from "./Components/Contributers";

const auth = getAuth();

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
      <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/add" element={user ? <AddTodo /> : <Navigate to="/login" />} />
      <Route path="/profile" element={user ? <ProfileCode /> : <Navigate to="/login" />} />
      <Route path="/comingsoon" element={user ? <ComingSoon />: <Navigate to="/login" />} />
      <Route path="/contributers" element={user ? <Contributers />: <Navigate to="/login" />} />
      <Route path="/login" element={<LogInForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
