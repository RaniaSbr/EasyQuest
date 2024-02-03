import React from "react";
import Home_landing from "../Components/Home_landing";
import Team from "../Components/Team";
import Contact from "../Components/Contact";
import Navbar_landing from "../Components/Navbar_landing";

function Landing(params) {
  return (
    <div className="grid ">
      <div className="fixed ">
        <Navbar_landing></Navbar_landing>
      </div>
      <div className="grid ">
        <section id="home_land" className="flex items-center justify-center">
        <Home_landing id="home_land"></Home_landing>
        </section>
        <section id="team" className=" flex items-center justify-center">
        <Team id="team"></Team>
        </section>

        <div className="flex items-center justify-center ">
          <section id="contact" className=" flex items-center justify-center">
            {" "}
            <Contact id="contact"></Contact>
          </section>
        </div>
      </div>
    </div>
  );
}
export default Landing;
