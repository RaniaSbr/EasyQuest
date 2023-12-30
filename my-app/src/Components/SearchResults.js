// frontend/src/SearchResults.js
import axios from "axios";
import React, { useState } from "react";

const SearchResults = () => {
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const apiUrl = `http://localhost:8000/api/search/?q=${encodeURIComponent("maria")}`;
    axios.get(apiUrl)
      .then(response => console.log(response.data))
      .catch(error => console.error('Error:', error));
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