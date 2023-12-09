import React from "react";
import Navbar from "../Components/Navbar.js";
import Home_search from "../Components/Home_search.js";
function Accueil(params) {
  return (
    <div className="accueil">
      <Navbar></Navbar>
      <Home_search></Home_search>
    </div>
  );
}
export default Accueil;
