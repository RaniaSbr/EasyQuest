// frontend/src/SearchResults.js

import React, { useState } from "react";

const SearchResults = () => {
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch("/api/search/?q=your-search-query");
    const data = await response.json();
    setResults(data.results);
  };

  return (
    <div>
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            {result.username} - {result.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
