import React from "react";
import Navbar from "../Components/Navbar";
import Seemore_compo from "../Components/Seemore_compo";
function Seemore(params) {
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
  };

  return (
    <div>
      <Navbar></Navbar>
      <Seemore_compo articleData={articleData}></Seemore_compo>
    </div>
  );
}
export default Seemore;
