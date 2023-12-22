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
    <div className="profile_Compo relative rounded-3xl md:w-[70vw] lg:w-[55vw]   w-[90vw]  h-[90vh] mt-20 grid justify-items-center content-center">
      <div className="profile-co absolute rounded-3xl w-full bottom-0 h-4/5"></div>
      <div className="profile absolute bottom-5 ">
        <div className="pro-top  flex items-end justify-start w-full h-2/5 mb-10">
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
          <hr className="profile-hr bg-zinc-900 md:w-[500px] w-5/6" />
          <hr className="profile-hr bg-zinc-900 md:w-[500px] w-5/6" />
          <div className="ligne ligne-username ">
            <label htmlFor="username " className="text-lg md:text-xl">
              User Name{" "}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your user name"
            />
            <button onClick={handleEditClick}>Edit</button>
          </div>
          <hr className="profile-hr bg-zinc-900 md:w-[500px] w-5/6" />
          <hr className="profile-hr bg-zinc-900 md:w-[500px] w-5/6" />
          <div className="ligne ligne-mail">
            <label className="text-lg md:text-xl" htmlFor="UserEmail">
              Email
            </label>
            <input
              type="email"
              id="UserEmail"
              name="UserEmail"
              placeholder="Enter your email"
            />
            <button onClick={handleEditClick}>Edit</button>
          </div>
          <hr className="profile-hr bg-zinc-900 md:w-[500px] w-5/6" />
          <hr className="profile-hr bg-zinc-900 md:w-[500px] w-5/6" />
          <div className="ligne ligne-password">
            <label className="text-lg md:text-xl" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
            <button onClick={handleEditClick}>Edit</button>
          </div>
          <hr className="profile-hr bg-zinc-900 md:w-[500px] w-5/6" />
          <hr className="profile-hr bg-zinc-900 md:w-[500px] w-5/6" />
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
