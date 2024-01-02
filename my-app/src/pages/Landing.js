import React from "react";
import Home_landing from "../Components/Home_landing";
import Team from "../Components/Team";
import Contact from "../Components/Contact";
import Navbar_landing from "../Components/Navbar_landing";

function Landing(params) {
  return (
    <div>
      <Navbar_landing></Navbar_landing>
      <Home_landing id="home"></Home_landing>
      <Team id="profile"></Team>
      <Contact id="favorites"></Contact>
    </div>
  );
}
export default Landing;
