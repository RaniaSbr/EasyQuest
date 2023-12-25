import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites";
import Search_result from "./pages/Search_result.js";
import ModPage from "./pages/mod_start_page.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/Settings" element={<Settings />}></Route>{" "}
        <Route path="/Favorites" element={<Favorites />}></Route>
        <Route path="/Search_result" element={<Search_result />}></Route>
        <Route path="/ModPage" element={<ModPage />}></Route>
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
