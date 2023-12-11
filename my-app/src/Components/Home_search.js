// Dans Home_search.jsx
import React from "react";
import "../Styles/Home_search.css";
import Search_bar from "../Components/Search_bar";

function Home_search(params) {
  return (
    <div className="homesearch">
      <img className="logo-search" src="./Assets/logo.png" alt="" />
      <img className="nom-search" src="./Assets/nom.png" alt="" />
      <Search_bar backgroundColor="transparent" />
    </div>
  );
}

export default Home_search;
