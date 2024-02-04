import React from "react";
import GenericNavBar from "../Components/generic_nav_bar";
import Login from "../Components/Login";
function login_page(params) {
  return (
    <div className="login_Page">
      <GenericNavBar></GenericNavBar>
      <Login></Login>
    </div>
  );
}
export default login_page;
