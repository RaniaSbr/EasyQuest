import React, { useState } from "react";
import "../Styles/Navbar.css";
import { NavLink } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faX,
  faBars,
  faNewspaper,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function Navbar_mod(params) {
  const [respoListVisible, setRespoListVisible] = useState(false);
  const location = useLocation();
  const respoOff = (event) => {
    setRespoListVisible(false);
  };
  const respoON = (event) => {
    setRespoListVisible(true);
  };

  return (
    <div className=" flex w-screen items-center justify-start h-20 bg-grey">
      <div className="navnav w-full md:w-3/5 flex justify-between items-center ml-10">
        <div className="logo-igl flex w-full items-center content-center ">
          <NavLink to="/">
            <img className="logo-easy h-12  " src="./Assets/logo.png" alt="" />
          </NavLink>
          <NavLink to="/">
            <img className="logo-nom  ml-2" src="./Assets/nom.png" alt="" />
          </NavLink>
        </div>

        <div className="pages object-none object-center">
          <ul>
            <li>
              <NavLink
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Articles
              </NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink
                to="/Profile"
                className={location.pathname === "/Profile" ? "active" : ""}
              >
                Profile
              </NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink
                to="/Favorites"
                className={location.pathname === "/Favorites" ? "active" : ""}
              ></NavLink>{" "}
            </li>
          </ul>
        </div>

        <div className="respo grid">
          <button onClick={respoON}>
            <FontAwesomeIcon icon={faBars} className="hamburger" />
          </button>
        </div>

        {respoListVisible && (
          <div className="respo-list ">
            <div className="bg-grey rounded-3xl h-[350px]  mt-5 grid mr-12 content-start gap-5 justify-items-center w-[250px] m">
              <button href="" onClick={respoOff} className="icon-x">
                <FontAwesomeIcon icon={faX} className="xx" />{" "}
              </button>
              <p>Zaidi Yasmine</p>
              <hr className="w-4/5" />

              <ul>
                <li>
                  <NavLink
                    to="/Profile"
                    className={location.pathname === "/Profile" ? "active" : ""}
                  >
                    <FontAwesomeIcon icon={faUser} className="h-6 " /> Profile
                  </NavLink>{" "}
                </li>
                <li>
                  <NavLink
                    to="/Favorites"
                    className={
                      location.pathname === "/Favorites" ? "active" : ""
                    }
                  >
                    <FontAwesomeIcon icon={faNewspaper} className="h-6" />{" "}
                    Articles
                  </NavLink>{" "}
                </li>
                <li>
                  {" "}
                  <NavLink
                    to="/Settings"
                    className={
                      location.pathname === "/Settings" ? "active" : ""
                    }
                  ></NavLink>{" "}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar_mod;
