
import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";
import AddTodo from "./Components/AddTodo";
import LogInForm from "./Components/LogInForm";
import SignUpForm from "./Components/SignUpForm";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Profile from "./Components/profile";

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
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/add" element={user ? <AddTodo /> : <Navigate to="/login" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/login" element={<LogInForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
