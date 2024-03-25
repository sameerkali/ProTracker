import React from "react";
import { Link } from "react-router-dom";

const LogInForm = () => {
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
            {/* //////////////////////////////// */}
            <form className="flex-1 ">
              <label className="input input-bordered flex items-center gap-2 sm:w-[29.8rem] w-[29rem] mt-4">
                <input type="text" className="grow" placeholder="Email" />
              </label>
              <label className="input input-bordered flex items-center gap-2 sm:w-[29.8rem] w-[29rem] mt-4">
                <input
                  type="password"
                  className="grow"
                  placeholder="**********"
                />
              </label>
              <button
                type="submit"
                className=" mt-4 sm:w-[30rem] border rounded-md p-3 border-gray-600 w-[29rem]"
              >
                LogIn
              </button>
              <div className="flex mt-3 justify-between ">
                <span className="">
                  New Member?{" "}
                  <Link to="/signup" className="ml-3 text-gray-100 underline">SignUp</Link>
                </span>
                <span className="mr-[-6rem] underline">
                  <a
                    className="sm:mr-[-1.9rem] sm:ml-[-10rem] mr-[1rem] text-gray-100"
                    href="/signup"
                  >
                    Forgot password
                  </a>
                </span>
              </div>
              <div className="flex w-[30rem] mt-10">
              {/* <SignIn/> */}
                <button
                  type="submit"
                  className=" mt-4 sm:w-[30rem] border rounded-md p-3 border-gray-600 w-[14rem] mr-4"
                >
                  Google
                </button>
                <button
                  type="submit"
                  className=" mt-4 sm:w-[30rem] border rounded-md p-3 border-gray-600 w-[14rem]"
                >
                  GitHub
                </button>
              </div>
            </form>
            {/* //////////////////////////////// */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogInForm;
