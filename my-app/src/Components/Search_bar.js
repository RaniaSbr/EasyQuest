import React, { useState } from 'react';
import "../Styles/Search_bar.css";
import SearchResult from "../pages/SearchResult";

const Search_bar = ({ backgroundColor  }) => {
  const [query, setQuery] = useState("");
  const keywords = "";
  const authors = "";
  const institutions = "";
  const handleSearch = () => {
    SearchResult({query, keywords, authors, institutions });
  };

  return (
    <div className="bar-search">
      <img src="./Assets/search.png" alt="Recherche" className="search-icon" />
      <input
        id='query_r'
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
