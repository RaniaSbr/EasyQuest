import React, { useState } from "react";
import "../Styles/ProfileComponent.css";
import { NavLink } from "react-router-dom";
import { Link, useLocation } from "react-router-dom"; 

function ProfileComponent(params) {
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
    <div className="profilecompo">
      <div className="GreyWhite"> 
      <div className="grey"></div>
      <div className="white"></div></div>    
      <div className="profile"> 
      <h1>Zaidi Yasmine</h1>
      <h2>User</h2>
      <img className="user-pic" src="./Assets/user.png" alt="" /> 

      <hr />

      <div className="ligne ligne-username">
        <label htmlFor="username">User Name </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your user name"
        />
        <button onClick={handleEditClick}>
         Edit
        </button>
      </div>

      <hr/>

      <div className="ligne ligne-mail">
        <label   htmlFor="UserEmail">Email</label>
        <input
          type="email"
          id="UserEmail"
          name="UserEmail"
          placeholder="Enter your email"
        />
        <button onClick={handleEditClick}>
         Edit
        </button>
      </div>

      <hr />

      <div className="ligne ligne-password">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
        />
         <button onClick={handleEditClick}>
         Edit
        </button>
      </div>

      <hr />
      <NavLink to="/">
        {" "}
        <div className="logout">
        <button onClick={handleLogout}>
          <img className="logout-icon" src="./Assets/logout.png" alt="Logout" />
          <p>Logout</p>
        </button>
        </div>
      </NavLink>
      </div>
     </div>
  );
}

export default ProfileComponent;
