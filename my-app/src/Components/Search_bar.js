import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Search_bar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; // Correction ici

const Search_bar = ({ backgroundColor }) => {
  return (
    <div className="bar-search">
      <div className="bar-input">
        {" "}
        <input
          type="search"
          placeholder="Rechercher des articles scientifiques ..."
          style={{ backgroundColor: backgroundColor }}
          className="search-input border-2"
        />
      </div>

      <div className="search-icon">
        <NavLink to={"/Search_result"}>
          <FontAwesomeIcon icon={faSearch} /> {/* Correction ici */}
        </NavLink>
      </div>
    </div>
  );
};

export default Search_bar;
