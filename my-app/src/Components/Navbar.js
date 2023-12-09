import React from "react";
import "../Styles/Navbar.css";

function Navbar(params) {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="./Assets/logo.png" alt="" />
        <img src="./Assets/nom.png" alt="" />
      </div>
      <div className="pages"></div>
    </div>
  );
}
export default Navbar;
