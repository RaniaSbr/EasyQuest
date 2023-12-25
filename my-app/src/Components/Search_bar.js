import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Search_bar.css";
const Search_bar = ({ backgroundColor }) => {
  return (
    <div className="bar-search">
       <img
          src="./Assets/search.png"
          alt="Recherche"
          className="search-icon"
        />
      <input
        type="search"
        placeholder="Rechercher des articles scientifiques ..."
        style={{ backgroundColor: backgroundColor }}
      />
      <NavLink to={"/Search_result"}>
        {" "}
      </NavLink>
    </div>
  );
};
export default Search_bar;
