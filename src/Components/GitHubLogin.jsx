import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, githubAuthProvider } from "../firebase";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { github } from "../assets";

const GitHubLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      const result = await signInWithPopup(auth, githubAuthProvider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cursor-pointer">
      {isLoading ? (
        <img className="h-14 animate-spin" src={github} alt="github icon" />
      ) : (
        <img onClick={handleClick} className="h-14" src={github} alt="github icon" />
      )}
    </div>
  );
};

export default GitHubLogin;
