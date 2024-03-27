import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import React from "react";
import Hero from "./Components/Hero";
import SignUpForm from "./Components/SignUpForm";
import LogInForm from "./Components/LogInForm";
import Home from "./Components/Home";
import Protected from "./Components/Protected";
import NotFound from "./Components/NotFound";
import AddTodo from "./Components/AddTodo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddTodo />} />
      <Route path="/login" element={<LogInForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
