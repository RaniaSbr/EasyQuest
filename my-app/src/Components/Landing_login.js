import React, { useState } from "react";
import Register from "./Register";
import { NavLink } from "react-router-dom";

function Landing_login(params) {
  const [EmailVal, setEmailVal] = useState();
  const [PassVal, setPassVal] = useState();
  const [ConfirmVal, setConfirmVal] = useState();
  const [LastVal, setLastVal] = useState();
  const [ConfVal, setConfVal] = useState();

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
    if (FirstVal && LastVal && EmailVal && PassVal && ConfVal) {
    }
  };

  return (
    <div className="w-[100vw] flex gap-0 bg-grey items-center">
      <div className="hidden lg:flex w-[30vw] items-center justify-start h-[100vh]">
        <img src="../Assets/land_reg.png" className="h-full bg-blue " alt="" />
        <div className="lg:flex fixed hidden  flex-col items-center justify-center left-[20vw]">
          <NavLink to="/Reg_land">
            <button className="bg-grey px-10 py-3  text-xl rounded-l-xl font-bold">
              Sign up{" "}
            </button>
          </NavLink>
          <NavLink to="/log_land">
            <button className="mt-4  font-bold text-lightgrey text-xl">
              Login
            </button>
          </NavLink>
        </div>
      </div>

      <div className="w-[100vw] lg:w-[70vw] h-screen flex items-center justify-center">
        <div className="  grid content-center justify-items-center">
          <div className=" flex items-center justify-center  rounded-2xl my-8 ">
            <div className=" grid  content-center justify-items-center  rounded-3xl text-black  h-full   outline-0 ">
              <form
                className="text-black grid content-center justify-items-center grid-cols-1 gap-5  h-full"
                onSubmit={handleSubmit}
              >
                <div className="grid content-center justify-items-center  h-20">
                  {" "}
                  <label
                    className="  text-lightgrey w-full flex justify-start text-xl m-2 float-left "
                    htmlFor="emil2"
                  >
                    Email
                  </label>
                  <input
                    className=" outline w-[60vw] lg:w-[30vw]  outline-offset-2
                   
                    outline-none text-grey rounded-md block h-8 text-gray-600  px-8 py-6   mb-2 rounded-0"
                    value={EmailVal}
                    onChange={(e) => {
                      setEmailVal(e.target.value);
                    }}
                    type="email "
                    id="emil2"
                    placeholder="Enter your Email"
                  />
                </div>
                <div className="grid content-center justify-items-center  h-20">
                  {" "}
                  <label
                    className="  text-lightgrey w-full flex justify-start text-xl m-2 float-left "
                    htmlFor="pwd2"
                  >
                    Password
                  </label>
                  <input
                    className=" outline w-[60vw] lg:w-[30vw]  outline-offset-2
                   
                    outline-none text-grey rounded-md block h-8 text-gray-600  px-8 py-6   mb-2 rounded-0"
                    type="password "
                    id="pwd2"
                    placeholder="Enter your Password"
                    onChange={(e) => {
                      setPassVal(e.target.value);
                    }}
                    value={PassVal}
                  />
                </div>
                <div className="grid content-center justify-items-center  h-20">
                  <NavLink to="/Reg_land">
                    <button
                      type="submit"
                      id="sub_button"
                      className="login-button  bg-grey  py-[0.5rem] 
                     w-[60vw] lg:w-[30vw] cursor-pointer"
                    >
                      {" "}
                      Sign up
                    </button>
                  </NavLink>
                </div>{" "}
              </form>

              <div className=" mt-0">
                <p className="text-lightgrey">You don't have an account? </p>

                <NavLink to="/Reg_land">
                  {" "}
                  <a href="" className="">
                    {" "}
                    <p className=" text-center text-blue underline font-bold ">
                      {" "}
                      Sign up here.
                    </p>
                  </a>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing_login;
