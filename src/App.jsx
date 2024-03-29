
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Protected from "./Components/Protected";
import NotFound from "./Components/NotFound";
import AddTodo from "./Components/AddTodo";
import LogInForm from "./Components/LogInForm";
import SignUpForm from "./Components/SignUpForm";
import { getAuth } from "firebase/auth";
import Profile from "./Components/profile";

const auth = getAuth();

const isLoggedIn = () => {
  return auth.currentUser !== null;
};

const ProtectedRoute = ({ children }) => {
  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/add" element={<ProtectedRoute><AddTodo /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/login" element={<LogInForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
