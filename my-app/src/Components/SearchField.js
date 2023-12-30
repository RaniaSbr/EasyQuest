import React from "react";
import "../Styles/searchField.css";


function SearchField({ placeholder, value, onChange }) {
  return (
    <div className="search-field">
      <input
        type="text"
        id="search"
        placeholder={placeholder}
        className="search-input"
        value={value}
        onChange={onChange}
      />
      <img className="search_img" src="./Assets/search2.svg" alt="Search Icon" />
    </div>
  );
}

export default SearchField;
