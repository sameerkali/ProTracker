import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import GoogleLogin from "./GoogleLogin";
import { github } from "../assets";
import GitHubLogin from "./GitHubLogin";

const SignUpForm = () => {
  const [displayName, setDisplayName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  console.log("github image: ", github);

  const handleSignup = async event => {
    event.preventDefault();

    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Password length validation
    const isPasswordValid = password.length >= 4 && password.length <= 16;

    // Check if email is valid
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Check if password meets length requirements
    if (!isPasswordValid) {
      setError("Password must be between 4 to 16 characters.");
      return;
    }

    // Console log all the data
    console.log("First Name:", displayName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Password:", password);

    // Your signup logic here
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("signup working firebase data: ", userCredentials);
      const user = userCredentials.user;
      // user.updateProfile({displayName: displayName});
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");

      setError(null);
    } catch (error) {
      console.log("error during signup", error);
      setError(error.message);
    }
  };

  return (
    <section className="w-full h-[90vh] py-12 md:py-24 lg:py-32 xl:py-48 mt-[10rem]  sm:mt-[-2rem] ">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2 sm:ml-0 ml-[3rem]">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Dominate Your Goals With ProTracker.
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 ">
              The platform for handling your tasks with ProTracker to visualize
              your performance on a daily, weekly, monthly, and yearly basis.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2 sm:ml-[-5rem] ">
            <div className="flex justify-center gap-16 ml-20 mb-7 mt-7">
              <div>
                <GoogleLogin />
              </div>
              <div className="mt-[-4px]">
                <GitHubLogin />
              </div>
            </div>
            <hr className="w-[30rem] border-t-2 border-gray-600" />
            {/* ///////////////////////////////// */}
            <form className="flex-1" onSubmit={handleSignup}>
              <div className="sm:flex flex-1 mt-4 w-[30rem]">
                <label className="input input-bordered flex items-center gap-2 mr-4 sm:w-[14.4rem] bg-transparent">
                  <input
                    type="text"
                    className="grow"
                    placeholder="First Name"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 sm:mt-0 mt-4 w-[29rem] sm:w-[14.4rem]">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                </label>
              </div>
              <label className="input input-bordered flex items-center gap-2 sm:w-[29.8rem] w-[29rem] mt-4">
                <input
                  type="text"
                  className="grow"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 sm:w-[29.8rem] w-[29rem] mt-4">
                <input
                  type="password"
                  className="grow"
                  placeholder="**********"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </label>
              <button
                type="submit"
                className=" mt-4 sm:w-[30rem] border rounded-md p-3 border-gray-600 w-[29rem]"
              >
                SignUp
              </button>
              {error &&
                <p className="text-red-500 mt-2">
                  {error}
                </p>}
              <div className="flex mt-3 justify-between ">
                <span className="">
                already have an account?{" "}
                  <Link to="/login" className="ml-3 text-gray-100 underline">
                    LogIn
                  </Link>
                </span>
                <span className="mr-[-6rem] underline">
                  <a
                    className="sm:mr-[-1.9rem] sm:ml-[-10rem] mr-[1rem] text-gray-100"
                    href="#"
                  >
                    Forgot password
                  </a>
                </span>
              </div>
            </form>
            {/* ///// */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
