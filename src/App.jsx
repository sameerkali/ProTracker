import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import Hero from "./Components/Hero";
import SignUpForm from "./Components/SignUpForm";
import LogInForm from "./Components/LogInForm";
import Home from "./Components/Home";

function App() {
  const isAuthenticated = false;

  return (
    <div>
      {isAuthenticated
        ? <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<LogInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
          </Routes>
        : <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
          </Routes>}
    </div>
  );
}

export default App;
