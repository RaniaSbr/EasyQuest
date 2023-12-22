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
    <div className="profile-comp relative bg-red-600 w-screen h-3/5"></div>
  );
}

export default ProfileComponent;
