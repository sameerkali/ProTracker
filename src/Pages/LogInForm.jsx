import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../Components/GoogleLogin";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import GitHubLogin from "../Components/GitHubLogin";
import { grid, gridMobile } from "../assets";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("signup working firebase data: ", userCredentials);
      const user = userCredentials.user;
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
    <section className="relative w-full h-[48.8rem] py-12 md:py-24 lg:py-32 xl:py-48 mt-[10rem] sm:mt-[-2rem]">
      {window.innerWidth >= 768
        ? <img
            className="absolute top-0 z-0 w-full h-full object-cover  md:block "
            src={grid}
            alt="Grid background"
          />
        : <img
            className="absolute top-[-10rem] left-10 z-0 w-[50rem] h-[67rem] object-cover opacity-50 "
            src={gridMobile}
            alt="Grid background"
          />}
      
      <div className="container px-4 md:px-6 z-10 relative">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2 sm:ml-0 ml-[3rem]">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-sans text-white">
              Dominate Your Goals With ProTracker.
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 font-sans">
              The platform for handling your tasks with ProTracker to visualize
              your performance on a daily, weekly, monthly, and yearly basis.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2 sm:ml-[-5rem]">
            <div className="flex justify-center gap-16 ml-20 mb-7 mt-7">
              <div>
                <GoogleLogin />
              </div>
              <div className="mt-[-4px]">
                <GitHubLogin />
              </div>
            </div>
            <hr className="w-[30rem] border-t-2 border-gray-600" />
            {/* Form */}
            <form className="flex-1 relative z-10" onSubmit={handleLogin}>
              <label className="input input-bordered flex items-center gap-2 sm:w-[29.8rem] w-[29rem] mt-4">
                <input
                  type="text"
                  className="grow"
                  placeholder="Email"
                  onChange={e => setEmail(e.target.value)}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 sm:w-[29.8rem] w-[29rem] mt-4">
                <input
                  type="password"
                  className="grow"
                  placeholder="**********"
                  onChange={e => setPassword(e.target.value)}
                />
              </label>
              <button
                type="submit"
                className=" mt-4 sm:w-[30rem] bg-[#1d232ad6] border rounded-md p-3 border-gray-600 w-[29rem]"
              >
                LogIn
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <div className="flex mt-3 justify-between">
                <span className="">
                  New Member?{" "}
                  <Link to="/signup" className="ml-3 text-gray-100 underline">
                    SignUp
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
            {/* End of Form */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogInForm;
