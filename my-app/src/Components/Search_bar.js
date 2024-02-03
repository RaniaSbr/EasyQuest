import { NavLink } from "react-router-dom";
import React from 'react';
import "../Styles/Search_bar.css";
import { toast, ToastContainer } from "react-toastify";
import{ useState } from "react";
import SearchResult from "../pages/SearchResult"
const Search_bar = ({ backgroundColor }) => {
  const [query, setQuery] = useState("");
  const [keywords, setKeywords] = useState("");
  const [authors, setAuthors] = useState("");
  const [institutions, setInstitutions] = useState("");

  const handleSearch = () => {
    // Appeler la fonction SearchResult avec les données de recherche
    SearchResult(query, keywords, authors, institutions);
  };

  return (
    <div className="bar-search">
      <img src="./Assets/search.png" alt="Recherche" className="search-icon" />
      <input
        type="search"
        placeholder="Rechercher des articles scientifiques ..."
        style={{ backgroundColor: backgroundColor }}
        className="border-2 placeholder:text-[15.4px]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button onClick={handleSearch}>Rechercher</button>
    </div>
  );
};

export default Search_bar;