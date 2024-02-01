import React, { useState, useEffect } from "react";
import "../Styles/Navbar.css";
import { NavLink } from "react-router-dom";
import { CiPhone } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

import { RiTeamLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faX,
  faBars,
  faUser,
  faHouse,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

function Navbar_landing(params) {
  const [respoListVisible, setRespoListVisible] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");

  const respoOff = (event) => {
    setRespoListVisible(false);
  };

  const respoON = (event) => {
    setRespoListVisible(true);
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollOffset = window.scrollY;
      const homePosition = document.getElementById("home_land").offsetTop;
      const profilePosition = document.getElementById("team").offsetTop;
      const favoritesPosition = document.getElementById("contact").offsetTop;

      if (scrollOffset >= homePosition && scrollOffset < profilePosition) {
        setActiveSection("home_land");
      } else if (
        scrollOffset >= profilePosition &&
        scrollOffset < favoritesPosition
      ) {
        setActiveSection("team");
      } else if (scrollOffset >= favoritesPosition) {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex  w-screen items-center justify-around h-20 bg-grey">
      <div className="logo-igl flex   items-center content-center">
        <NavLink to="/">
          <img className="logo-easy  h-12" src="./Assets/logo.png" alt="" />
        </NavLink>
        <NavLink to="/">
          <img className="logo-nom ml-2" src="./Assets/nom.png" alt="" />
        </NavLink>
      </div>

      <div className=" hidden md:flex  justify-between items-center object-none object-center ml-8 ">
        <ul className="flex gap-5">
          <li className="cursor-pointer hover:text-blue hover:underline">
            <ScrollLink
              to="home_land"
              smooth={true}
              duration={500}
              className={`flex items-center gap-3 ${
                activeSection === "home_land" ? "active" : ""
              }`}
            >
              Home
            </ScrollLink>
          </li>
          <li className="cursor-pointer hover:text-blue hover:underline">
            <ScrollLink
              to="team"
              smooth={true}
              duration={500}
              className={`flex items-center gap-3 ${
                activeSection === "team" ? "active" : ""
              }`}
            >
              Our team
            </ScrollLink>
          </li>
          <li className="cursor-pointer hover:text-blue hover:underline">
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              className={`flex items-center gap-3 ${
                activeSection === "contact" ? "active" : ""
              }`}
            >
              Contact us
            </ScrollLink>
          </li>
        </ul>
      </div>
      <button className="border-2 border-blue rounded-xl px-5 py-2 hidden md:grid">
        <p className="text-blue">Register now !</p>
      </button>
      <div className=" grid md:hidden">
        <button onClick={respoON}>
          <FontAwesomeIcon icon={faBars} className="hamburger" />
        </button>
      </div>

      {respoListVisible && (
        <div className="respo-listL  grid justify-items-end content-center gap-5 mt-3 ">
          <div className=" rounded-3xl h-[200px] mt-16  grid mr-3 content-start gap-0 justify-items-center w-[250px] ">
            <ul className=" bg-grey grid gap-8  rounded-3xl pb-10  mr-8  content-start  justify-items-center w-[250px] ">
              <button href="" onClick={respoOff} className="icon-x">
                <FontAwesomeIcon icon={faX} className="xx" />{" "}
              </button>
              <li className="cursor-pointer hover:text-blue hover:underline">
                <ScrollLink
                  to="home"
                  smooth={true}
                  duration={500}
                  className="flex items-center gap-3"
                >
                  <IoHomeOutline size="25px" />
                  Home
                </ScrollLink>
              </li>
              <li className="cursor-pointer hover:text-blue hover:underline">
                <ScrollLink
                  to="profile"
                  smooth={true}
                  duration={500}
                  className="flex items-center gap-3"
                >
                  <RiTeamLine size="25px" /> Our team
                </ScrollLink>
              </li>
              <li className="cursor-pointer hover:text-blue hover:underline">
                <ScrollLink
                  to="favorites"
                  smooth={true}
                  duration={500}
                  className="flex items-center gap-3"
                >
                  <CiPhone size="25px" /> Contact us
                </ScrollLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar_landing;
