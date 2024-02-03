import React from "react";
import Navbar from "../Components/Navbar";
import Search_bar from "../Components/Search_bar";
import Article from "../Components/Article";
import Filter from "../Components/Filter";
function SearchResult(params) {
  const articleData = {
    date: "12/12/2023",
    title:
      "Pharmacogenetic Risk Scores for Perindopril Clinical and Cost Effectiveness in Stable Coronary Artery Disease: When Are We Ready to Do?",
    authors: ["Author 1", "Author 2", "Author 3", "Author 4"],

    institutions: [
      "BIG UNIVERSITY OF SOMETHING SOMETHING VERY BIG",
      "Institution 2",
      "Institution 3",
      "Institution 4",
    ],

    url: "http://ictinnovations.org/2010",
    fav: "1",
  };

  return (
    <div className="SeearchResult_Page grid content-center gap-10 justify-items-center ">
      <Navbar></Navbar>
      <div className="w-[90vw] flex items-center justify-start ">
        {" "}
        <Search_bar backgroundColor="white"></Search_bar>
      </div>
      <div className="w-[90vw] flex items-center justify-start ">
        <Filter></Filter>
      </div>
      <Article articleData={articleData}></Article>
    </div>
  );
}
export default SearchResult;
