import React, { useState } from "react";
import "../Styles/ProfileComponent.css";

function ProfileComponent(params) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    // Add your logic for handling edit click
    console.log("Edit button clicked");
    // You can toggle the state like this if needed
    setIsEditing(!isEditing);
  };

  return (
    <div className="profilecompo">
      <img className="user-pic" src="./Assets/user.png" alt="" /> 
      <div className="ligne">
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

      <div className="ligne">
        <label htmlFor="UserEmail">Email</label>
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

      <div className="ligne">
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
    </div>
  );
}

export default ProfileComponent;
