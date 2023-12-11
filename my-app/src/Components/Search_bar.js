import React from "react";
import "../Styles/Search_bar.css";
const Search_bar = ({ backgroundColor }) => {
  return (
    <div className="bar-search">
      <input
        type="search"
        placeholder="Rechercher des articles scientifiques ..."
        style={{ backgroundColor: backgroundColor }}
      />
      <img src="./Assets/search.png" alt="Recherche" className="search-icon" />
    </div>
  );
};
export default Search_bar;
