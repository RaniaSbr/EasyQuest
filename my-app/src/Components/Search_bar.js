import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Search_bar.css";
const Search_bar = ({ backgroundColor }) => {
  return (
    <div className="bar-search">
      <input
        type="search"
        placeholder="Rechercher des articles scientifiques ..."
        style={{ backgroundColor: backgroundColor }}
      />
      <NavLink to={"/Search_result"}>
        {" "}
        <img
          src="./Assets/search.png"
          alt="Recherche"
          className="search-icon"
        />
      </NavLink>
    </div>
  );
};
export default Search_bar;
