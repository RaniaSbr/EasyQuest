import React from "react";
import Navbar from "../Components/Navbar";
import Login from "../Components/Login";
function login_page(params) {
  return (
    <div className="login_Page">
      <Navbar></Navbar>
      <Login></Login>
    </div>
  );
}
export default login_page;
