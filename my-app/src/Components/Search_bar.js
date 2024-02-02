import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Search_bar.css";

const Search_bar = ({ backgroundColor }) => {
  try {
    var query = document.getElementById('51').value;
  } catch (error) {
        query ="";
  }
  
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
        id="51"
        type="search"
        placeholder="Rechercher des articles scientifiques ..."
        style={{ backgroundColor: backgroundColor }}
        className="border-2 placeholder:text-[15.4px]"
      />
    </div>
  );
};

export default Search_bar;
