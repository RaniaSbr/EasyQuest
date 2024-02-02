import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Login.css";

function Login() {
  const [emailval, setemailval] = useState("");
  const [passval, setpassval] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login m-w-[40vw] m-h-[60vh] truncate grid content-center justify-items-center">
      <div className="login-container flex items-center justify-center h-[70vh] sm:w-3/5 md:w-2/5 w-4/5 rounded-2xl my-8 ">
        {/* Left Login Container */}
        <div className="left-login rounded-3xl text-black bg-lightgrey h-full m-2xl w-full flex items-center justify-center flex-col outline-0">
          <form className="text-black grid" onSubmit={handleSubmit}>
            {/* Email Input */}
            <label
              className="text-sm text-grey block m-2 float-left w-[70%]"
              htmlFor="emil1"
            >
              Email
            </label>
            <input
              className="outline outline-offset-2 outline-blue text-grey rounded-2xl block h-10 text-gray-600 py-1 px-8 w-[100%] m-auto mb-2 rounded-0"
              value={emailval}
              onChange={(e) => setemailval(e.target.value)}
              type="email"
              id="emil1"
              placeholder="Enter your Email"
            />

            {/* Password Input */}
            <label
              className="text-sm text-grey block m-2 float-left w-[78%]"
              htmlFor="pwd1"
            >
              Password
            </label>
            <input
              className="outline outline-offset-2 outline-blue text-grey rounded-2xl block h-10 text-gray-600 py-1 px-8 w-[100%] m-auto mb-2 rounded-0"
              type="password"
              id="pwd1"
              placeholder="Enter your Password"
              onChange={(e) => setpassval(e.target.value)}
              value={passval}
            />

            {/* Login Button */}
            <NavLink to="/">
              <button
                type="submit"
                id="sub_button"
                className="login-button w-full bg-grey px-[1rem] py-[0.5rem] cursor-pointer"
              >
                Login
              </button>
            </NavLink>
          </form>

          {/* Login Footer */}
          <div className="login-footer mt-5">
            <p className="text-grey">You don't have an account? </p>
            <p className="text-grey">Change password </p>
            <NavLink to="/Register">
              <a href="" className="">
                <p className="text-center text-blue underline font-bold">
                  Sign-up here.
                </p>
              </a>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
