import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Search_bar.css";

const Search_bar = ({ backgroundColor }) => {
  return (
    <div className="bar-search">
      <NavLink to="/SearchRes">
        {" "}
        <img
          src="./Assets/search.png"
          alt="Recherche"
          className="search-icon"
        />
      </NavLink>
      <input
        type="search"
        placeholder="Rechercher des articles scientifiques ..."
        style={{ backgroundColor: backgroundColor }}
        className="border-2 placeholder:text-[15.4px]"
      />
    </div>
  );
};

export default Search_bar;
