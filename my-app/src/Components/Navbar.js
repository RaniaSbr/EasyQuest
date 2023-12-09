import React from "react";
import "../Styles/Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar(params) {
  return (
    <div className="navbar">
      <div className="logo">
        <img className="logo-easy" src="./Assets/logo.png" alt="" />
        <img className="logo-nom" src="./Assets/nom.png" alt="" />
      </div>
      <div className="pages">
        <ul>
          <li>
            <NavLink to="/" activeClassName="active-link">
              Home
            </NavLink>{" "}
          </li>
          <li>
            {" "}
            <NavLink to="/Profile">Profile</NavLink>{" "}
          </li>
          <li>
            {" "}
            <NavLink to="/Favorites">Favorites</NavLink>{" "}
          </li>
          <li>
            {" "}
            <NavLink to="/Settings">Settings</NavLink>{" "}
          </li>
          <li>
            {" "}
            <NavLink to="/Profile">Profile</NavLink>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Navbar;
