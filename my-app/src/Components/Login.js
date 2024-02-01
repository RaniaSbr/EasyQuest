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
              <button onclick= {login_requet()}
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
  
function login_requet() {
  
  var username = null;
  var password = null;
  var username = document.getElementById('emil1').value;
  var password = document.getElementById('pwd1').value;
  
  fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
            // Assuming you're using Django CSRF protection
      },
      body: JSON.stringify({
          username: username,
          password: password
      })
  })
  .then(response => {
      return response.json();
  })
  .then(data => {
        // Afficher le message de succès
    
      
      if(data.error){
          console.log(data);
      }else{
          
          document.cookie = `token=${data.token}; path=/; SameSite=None; Secure`;
          console.log(data);
          var tokenValue = getCookie('token');
          console.log(tokenValue);  
      // Éventuellement, rediriger vers une autre page ou effectuer d'autres actions
          }
  })
  .catch(error => {
      console.log('Erreur:', error);
      document.getElementById('error-message').innerText = error; // Afficher le message d'erreur
  }); 

  
}

// Function to get CSRF token from cookies (Django)
function getCookie(name) {
  const cookieName = name + '=';
  const cookieArray = document.cookie.split(';');
  
  for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
      }
  }
  return null;
}

}


function login_requet() {
  var username = document.getElementById('email').value;
  var password = document.getElementById('psw1').value;
  
  fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
            // Assuming you're using Django CSRF protection
      },
      body: JSON.stringify({
          username: username,
          password: password
      })
  })
  .then(response => {
      return response.json();
  })
  .then(data => {
        // Afficher le message de succès
    
      
      if(data.error){
          console.log(data);
      }else{
          
          document.cookie = `token=${data.token}; path=/; SameSite=None; Secure`;
          console.log(data);
          var tokenValue = getCookie('token');
          console.log(tokenValue);  
      // Éventuellement, rediriger vers une autre page ou effectuer d'autres actions
          }
  })
  .catch(error => {
      console.log('Erreur:', error);
      document.getElementById('error-message').innerText = error; // Afficher le message d'erreur
  }); 

  
}

// Function to get CSRF token from cookies (Django)
function getCookie(name) {
  const cookieName = name + '=';
  const cookieArray = document.cookie.split(';');
  
  for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
      }
  }
  return null;
}

export default Login;
