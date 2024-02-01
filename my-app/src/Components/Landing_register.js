import React, { useState } from "react";
import Register from "./Register";
import { NavLink } from "react-router-dom";

function Landing_register(params) {
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
    <div className="w-[100vw] flex gap-0 ">
      <div className=" flex w-[30vw] items-center justify-start h-[100vh]">
        <img src="../Assets/land_reg.png" className="h-full bg-blue " alt="" />
        <div className="fixed  flex flex-col items-center justify-center left-[20%]">
          <NavLink to="/Reg_land">
            {" "}
            <button className=" mb-4 font-bold text-lightgrey text-xl">
              Sign up
            </button>
          </NavLink>
          <NavLink to="/log_land">
            {" "}
            <button className="bg-grey px-10 py-3 text-xl rounded-l-xl font-bold">
              Log in
            </button>
          </NavLink>
        </div>
      </div>

      <div className="w-[70vw] ">
        <div className="  grid content-start justify-items-center">
          <div className=" flex items-start justify-center  rounded-2xl my-8 ">
            <div className=" grid  content-center justify-items-center  rounded-3xl text-black  h-full   outline-0 ">
              <form
                className="text-black grid content-center justify-items-center grid-cols-1 gap-5  h-full"
                onSubmit={handleSubmit}
              >
                <div className="grid content-start justify-items-center  h-20 mt-0">
                  <label
                    className="  text-lightgrey w-full flex justify-start text-xl m-2 float-left "
                    htmlFor="first"
                  >
                    First name
                  </label>
                  <input
                    className=" outline w-[30vw] outline-offset-2
                   
                    outline-none text-grey rounded-md block h-8 text-gray-600  px-8 py-6   mb-2 rounded-0"
                    value={FirstVal}
                    onChange={(e) => {
                      setFirstVal(e.target.value);
                      setFirstError("");
                    }}
                    type="name "
                    id="first"
                    placeholder="Enter your Full name"
                  />
                  {firstError && <p className="text-red-500">{firstError}</p>}
                </div>
                <div className="grid content-center justify-items-center  h-20">
                  {" "}
                  <label
                    className="  text-lightgrey w-full flex justify-start text-xl m-2 float-left "
                    htmlFor="emil2"
                  >
                    Email
                  </label>
                  <input
                    className=" outline w-[30vw] outline-offset-2
                   
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
                    className=" outline w-[30vw] outline-offset-2
                   
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
                  {" "}
                  <label
                    className="  text-lightgrey w-full flex justify-start text-xl m-2 float-left "
                    htmlFor="conf"
                  >
                    Confirm Password
                  </label>
                  <input
                    className=" outline w-[30vw] outline-offset-2
                   
                    outline-none text-grey rounded-md block h-8 text-gray-600  px-8 py-6   mb-2 rounded-0"
                    type="password "
                    id="conf"
                    placeholder="Enter your Password"
                    onChange={(e) => {
                      setConfVal(e.target.value);
                    }}
                    value={ConfVal}
                  />
                </div>{" "}
                <div className="grid content-center justify-items-center  h-20">
                  <NavLink to="/Reg_land">
                    <button
                      type="submit"
                      id="sub_button"
                      className="login-button  bg-grey px-[10rem] py-[0.5rem] cursor-pointer"
                    >
                      {" "}
                      Sign up
                    </button>
                  </NavLink>
                </div>{" "}
              </form>

              <div className=" mt-0">
                <p className="text-lightgrey">You already have an account? </p>

                <NavLink to="/log_land">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing_register;
