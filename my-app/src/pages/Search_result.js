import React from "react";
import "../Styles/Search_result.css";
import Navbar from "../Components/Navbar";
import Result_com from "../Components/Result_com";
function Search_result(params) {
  return (
    <div className="result">
      <Navbar></Navbar>
      <Result_com></Result_com>
    </div>
  );
}
export default Search_result;
