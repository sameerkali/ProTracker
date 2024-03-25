import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import React from "react";
import Hero from "./Components/Hero";
import SignUpForm from "./Components/SignUpForm";
import LogInForm from "./Components/LogInForm";
import Home from "./Components/Home";
import Protected from "./Components/Protected";
import NotFound from "./Components/NotFound";

function App() {
  const isAuthenticated = localStorage.getItem("token");
  console.log(isAuthenticated)
  const navigate = useNavigate()
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogInForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      {isAuthenticated !== null ? (
        <Route path="/protect" element={<Protected />} />
      ) : (
        <navigate to="/login" />
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
