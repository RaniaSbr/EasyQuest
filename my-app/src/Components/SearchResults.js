
import React from "react";
import "../Styles/Search_result.css";
import Navbar from "../Components/Navbar";
import SearchResults from "../Components/SearchResults.js";
function Search_result(params) {
  return (
    <div className="result">
      <Navbar></Navbar>
      <SearchResults></SearchResults>
    </div>
  );
}
export default Search_result;

