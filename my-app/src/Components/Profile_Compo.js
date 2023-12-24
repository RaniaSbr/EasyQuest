import React from "react";
import "../Styles/ProfileComponent.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
function Profile_compo(params) {
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();

  const handleEditClick = () => {
    console.log("Edit button clicked");
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    console.log("Bouton de déconnexion cliqué");
    window.location.href = "/";
  };
  return (
    <div className="profile_Compo relative rounded-3xl md:w-[70vw] lg:w-[55vw]   w-[90vw]  h-[80vh] mt-20 grid justify-items-center content-center">
      <div className="profile-co absolute rounded-3xl w-full bottom-0 h-5/6 lg:h-[60vh] "></div>
      <div className="profile absolute bottom-12 lg:h-[60vh] h-5/6 ">
        <div className="pro-top  flex items-end justify-start w-full h-2/5 mb-10 ml-5 md:ml-0">
          <img className="user-pic" src="./Assets/user.png" alt="" />
          <div className="pro-nom grid content-center ml-10 ">
            {" "}
            <h1
              className="
            "
            >
              Zaidi Yasmine
            </h1>
            <h2>User</h2>
          </div>
        </div>
        <div className="pro-bottom grid content-center justify-items-center ml-5">
          <hr className="border-t border-zinc-900 md:w-[550px] w-5/6" />
          <div className="ligne h-10 flex content-center justify-items-center ligne-username ">
            <label htmlFor="username " className="text-lg md:text-xl">
              User Name{" "}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your user name"
            />
            <button
              onClick={handleEditClick}
              className="text-lg md:text-xl mr-2"
            >
              Edit
            </button>
          </div>
          <hr className="border-t border-zinc-900 md:w-[550px] w-5/6" />
          <div className="ligne h-10 grid content-center w-full justify-items-center ligne-username ">
            {" "}
            <label className="text-lg md:text-xl" htmlFor="UserEmail">
              Email
            </label>
            <input
              type="email"
              id="UserEmail"
              name="UserEmail"
              placeholder="Enter your email"
            />
            <button
              onClick={handleEditClick}
              className="text-lg md:text-xl mr-2"
            >
              Edit
            </button>
          </div>
          <hr className="border-t border-zinc-900 md:w-[550px] w-5/6" />
          <div className="ligne h-10 grid content-center w-full justify-items-center ligne-username ">
            {" "}
            <label className="text-lg md:text-xl" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
            <button
              onClick={handleEditClick}
              className="text-lg md:text-xl mr-2"
            >
              Edit
            </button>
          </div>
          <hr className="border-t border-zinc-900 md:w-[550px] w-5/6" />
          <NavLink to="/">
            {" "}
            <div className="logout">
              <button onClick={handleLogout} className="mt-10">
                <img
                  className="logout-icon"
                  src="./Assets/logout.png"
                  alt="Logout"
                />
                <p>Logout</p>
              </button>
            </div>
          </NavLink>
        </div>{" "}
      </div>
    </div>
  );
}

export default Profile_compo;
