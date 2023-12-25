import React, { useState } from "react";
import "../Styles/Login.css";
import { NavLink } from "react-router-dom";

function Register() {
  const [EmailVal, setEmailVal] = useState();
  const [PassVal, setPassVal] = useState();
  const [ConfirmVal, setConfirmVal] = useState();
  const [LastVal, setLastVal] = useState();
  const [FirstVal, setFirstVal] = useState();
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [lastError, setLastError] = useState("");
  const [firstError, setFirstError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!FirstVal) {
      setFirstError("Veuillez remplir le champ Prénom");
    } else {
      setFirstError("");
    }
    if (FirstVal && LastVal && EmailVal && PassVal && ConfirmVal) {
      // Effectuez l'action que vous souhaitez ici
    }
  };

  return (
    <div className="login  m-w-[100vw] m-h-[70vh] truncate grid content-center justify-items-center ">
      <div className="login-container flex items-center justify-center h-[100vh] sm:w-3/5 md:w-2/5 w-4/5 rounded-2xl my-8 ">
        <div className="left-login grid  content-center justify-items-center rounded-3xl text-black bg-lightgrey  h-full m-2xl w-full  outline-0 ">
          <form
            className="text-black grid content-center justify-items-center grid-cols-1  w-full h-full"
            onSubmit={handleSubmit}
          >
            <div className="grid content-center justify-items-center w-4/5 h-20">
              <label
                className=" text-sm text-grey block m-2 float-left w-[70%] "
                htmlFor="first"
              >
                First name
              </label>
              <input
                className="outline outline-offset-2 outline-blue text-grey rounded-2xl block h-8 text-gray-600 py-1 px-8 w-[80%]  mb-2 rounded-0"
                value={FirstVal}
                onChange={(e) => {
                  setFirstVal(e.target.value);
                  setFirstError("");
                }}
                type="name "
                id="first"
                placeholder="Enter your first name"
              />
              {firstError && <p className="text-red-500">{firstError}</p>}
            </div>
            <div className="grid content-center justify-items-center w-4/5 h-20">
              <label
                className=" text-sm text-grey block m-2 float-left w-[70%] "
                htmlFor="last"
              >
                Last name
              </label>
              <input
                className="outline outline-offset-2 outline-blue text-grey rounded-2xl block h-8 text-gray-600 py-1 px-8 w-[80%]  mb-2 rounded-0"
                value={LastVal}
                onChange={(e) => {
                  setLastVal(e.target.value);
                }}
                type="name "
                id="last"
                placeholder="Enter your last name"
              />
            </div>
            <div className="grid content-center justify-items-center w-4/5 h-20">
              {" "}
              <label
                className=" text-sm text-grey block m-2 float-left w-[70%] "
                htmlFor="emil2"
              >
                Email
              </label>
              <input
                className="outline outline-offset-2 outline-blue text-grey rounded-2xl block h-8 text-gray-600 py-1 px-8 w-[80%]  mb-2 rounded-0"
                value={EmailVal}
                onChange={(e) => {
                  setEmailVal(e.target.value);
                }}
                type="email "
                id="emil2"
                placeholder="Enter your Email"
              />
            </div>
            <div className="grid content-center justify-items-center w-4/5 h-20">
              {" "}
              <label
                className=" text-sm text-grey block m-2 float-left w-[78%] "
                htmlFor="pwd2"
              >
                Password
              </label>
              <input
                className="outline outline-offset-2 outline-blue text-grey rounded-2xl block h-8 text-gray-600 py-1 px-8 w-[80%] to mb-2 rounded-0"
                type="password "
                id="pwd2"
                placeholder="Enter your Password"
                onChange={(e) => {
                  setPassVal(e.target.value);
                }}
                value={PassVal}
              />
            </div>
            <div className="grid content-center justify-items-center w-4/5 h-20">
              {" "}
              <label
                className=" text-sm text-grey block m-2 float-left w-[78%] "
                htmlFor="conf"
              >
                Confirm Password
              </label>
              <input
                className="outline outline-offset-2 outline-blue text-grey rounded-2xl block h-8 text-gray-600 py-1 px-8 w-[80%]  mb-2 rounded-0"
                type="password "
                id="conf"
                placeholder="Enter your Password"
                onChange={(e) => {
                  setConfirmVal(e.target.value);
                }}
                value={PassVal}
              />
            </div>{" "}
            <div className="grid content-center justify-items-center w-full h-20">
              <NavLink to="/">
                <button
                  type="submit"
                  id="sub_button"
                  className="login-button  bg-grey px-[8rem] py-[0.5rem] cursor-pointer"
                >
                  {" "}
                  Sign up
                </button>
              </NavLink>
            </div>{" "}
          </form>

          <div className="login-footer mt-0">
            <p className="text-grey">You already have an account? </p>

            <NavLink to="/Login">
              {" "}
              <a href="" className="">
                {" "}
                <p className=" text-center text-blue underline font-bold ">
                  {" "}
                  Login here.
                </p>
              </a>
            </NavLink>
          </div>
        </div>
        {/* <div className="right-login rounded-r-3xl bg-grey h-full m-2xl w-full grid content-center justify-items-center gap-y-8">
          <p className="text-lightgrey text-3xl">Bienvenu !</p>
          <div className="img-login">
            <img src="./Assets/logo.png " className="h-40 " alt="" />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Register;
