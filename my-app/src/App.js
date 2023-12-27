import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites";
import Search_result from "./pages/Search_result.js";
import YourFormComponent from "./Components/form.js";
import ModManagement from "./pages/mod_management.js"
import Login_page from "./pages/Login_page";
import Register_page from "./pages/Register_page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import ModPage from "./pages/mod_start_page.js";

function App() {
  return (
    

      <Router>
        <Routes>
          <Route path="/" element={<YourFormComponent/>}></Route>
         <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/Settings" element={<Settings />}></Route>{" "}
          <Route path="/Favorites" element={<Favorites />}></Route>
          <Route path="/Login" element={<Login_page />}></Route>
          <Route path="/Register" element={<Register_page />}></Route>
          <Route path="/Search_result" element={<Search_result />}></Route>
          <Route path="/ModPage" element={<ModPage />}></Route>
          <Route path="/ModManagement" element={<ModManagement />}></Route>
        </Routes>
      </Router>


  );
}

export default App;
