import React, { useState } from "react";
import "../Styles/Login.css";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
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
  const notify = () => toast.error();
  
  const signUp=async()=> {
  
  var firstName = "document.getElementById('first').value";
  var lastName = "document.getElementById('last').value";
  var email = "document.getElementById('emil2').value";
  var password = "document.getElementById('pwd2').value";
  var firstName = document.getElementById('first').value;
  var lastName = document.getElementById('last').value;
  var email = document.getElementById('emil2').value;
  var password = document.getElementById('pwd2').value;

  await fetch('http://127.0.0.1:8000/api/sign-up/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
      })
  })
  .then(response => {
      return response.json();
  })
  .then(data => {
    if(data.error){
      
      // afficher le message dans le cas au il y a une erreur dans les informations qui sont envoyer (manque des informations /email deja existe ..)
      notify(); toast.error(data.error);
      
    }else{
        // le cas au tous marche bien  
        // ici il faut faire le redirect vers une autre page 
      alert(data.message);
      }
       
  })
  .catch(error => {
    
      console.error('Error:', error);
  });
}

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

    <div className="login  m-w-[100vw] m-h-[90vh] truncate grid content-center justify-items-center ">
      <div className="login-container flex items-center justify-center h-[110vh] sm:w-3/5 md:w-2/5 w-4/5 rounded-2xl my-8 ">
        <div className="left-login grid  content-center justify-items-center  rounded-3xl text-black bg-lightgrey  h-full m-2xl w-full  outline-0 ">
        <ToastContainer></ToastContainer>
          <form
            className="text-black grid content-center justify-items-center grid-cols-1  w-full h-full"
            onSubmit={handleSubmit}
          >
            <div className="grid content-start justify-items-center w-4/5 h-20 mt-0">
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
             
                <button onClick={() => { try{ console.log("h"); signUp(); console.log("hl"); }catch (error) {notify(); toast.error("ERROR HAPPENED  : " + error);}}}
                  type="submit"
                  id="sub_button"
                  className="login-button  bg-grey px-[8rem] py-[0.5rem] cursor-pointer"
                >
                  {" "}
                  Sign up
                </button>
            
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
