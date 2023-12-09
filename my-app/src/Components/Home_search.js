import React from "react";
import "../Styles/Home_search.css";
function Home_search(params) {
  return (
    <div className="homesearch">
      <img className="logo-search" src="./Assets/logo.png" alt="" />
      <img className="nom-search" src="./Assets/nom.png" alt="" />
      <div className="bar-search">
        <input
          type="search"
          placeholder="Rechercher des articles scientifiques ..."
        />
        <img
          src="./Assets/search.png"
          alt="Recherche"
          className="search-icon"
        />
      </div>
    </div>
  );
}
export default Home_search;
