import React, { useState } from "react";
import "../Styles/Navbar.css";
import { NavLink } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar(params) {
  const [respoListVisible, setRespoListVisible] = useState(false);
  const location = useLocation();
  const respoOff = (event) => {
    setRespoListVisible(false);
  };
  const respoON = (event) => {
    setRespoListVisible(true);
  };

  return (
    <div className="navbar">
      <div className="logo-igl">
        <NavLink to="/">
          <img className="logo-easy" src="./Assets/logo.png" alt="" />
          <img className="logo-nom" src="./Assets/nom.png" alt="" />
        </NavLink>
      </div>

      <div className="pages">
        <ul>
          <li>
            <NavLink
              to="/"
              className={location.pathname === "/" ? "active" : ""}
            >
              Home
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
            >
              Favorites
            </NavLink>{" "}
          </li>
        </ul>
      </div>

      <div className="respo">
        <button onClick={respoON}>
          <FontAwesomeIcon icon={faBars} className="hamburger" />
        </button>
      </div>

      {respoListVisible && (
        <div className="respo-list">
          <div className="respo-list2">
            <button href="" onClick={respoOff} className="icon-x">
              <FontAwesomeIcon icon={faX} className="xx" />{" "}
            </button>
            <div className="x">
              <div className="nom-user">
                <p>Zaidi Yasmine</p>
                <hr />
              </div>
            </div>

            <ul>
              <li>
                <NavLink
                  to="/Profile"
                  className={location.pathname === "/Profile" ? "active" : ""}
                >
                  <img src="./Assets/profile.png" alt="" /> Profile
                </NavLink>{" "}
              </li>
              <li>
                <NavLink
                  to="/Favorites"
                  className={location.pathname === "/Favorites" ? "active" : ""}
                >
                  <img src="./Assets/coeur.png" alt="" /> Favorites
                </NavLink>{" "}
              </li>
              <li>
                {" "}
                <NavLink
                  to="/Settings"
                  className={location.pathname === "/Settings" ? "active" : ""}
                >
                  <img src="./Assets/settings.png" alt="" />
                  Settings
                </NavLink>{" "}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default Navbar;
