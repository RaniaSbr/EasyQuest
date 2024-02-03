import React from "react";
import GenericNavBar from "../Components/generic_nav_bar";
import Register from "../Components/Register";
function Register_page(params) {
  return (
    <div className="Register_Page">
      <GenericNavBar></GenericNavBar>
      <Register></Register>
    </div>
  );
}
export default Register_page;
