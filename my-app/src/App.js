import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites";
import ModeratorList from "./Components/modList.js";
import Search_result from "./pages/Search_result.js";
import Login_page from "./pages/Login_page";
import Register_page from "./pages/Register_page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import ModPage from "./pages/mod_start_page.js";
import Moderators from "./pages/moderators.js";
import ModeratorForm from "./Components/InserModerateur.js";
import SearchResult from "./pages/SearchResult.js";
import Seemore from "./pages/See_more.js";
import Change_password from "./Components/Change_password.js";
import Landing from "./pages/Landing.js";
import Log_land from "./pages/Log_land.js";
import Reg_land from "./pages/Reg_land.js";
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Landing />}></Route>{" "} */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/Reg_land" element={<Reg_land />}></Route>
        <Route path="/log_land" element={<Log_land />}></Route>
        <Route path="/Landing_register" element={<Reg_land />}></Route>
        {/* <Route path="/" element={<Moderators />}></Route> */}
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/Settings" element={<Settings />}></Route>{" "}
        <Route path="/Favorites" element={<Favorites />}></Route>
        <Route path="/Login" element={<Login_page />}></Route>
        <Route path="/Register" element={<Register_page />}></Route>
        <Route path="/Search_result" element={<Search_result />}></Route>
        <Route path="/ModPage" element={<ModPage />}></Route>
        <Route path="/See_more" element={<Seemore />}></Route>
        <Route path="/SearchRes" element={<SearchResult />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
