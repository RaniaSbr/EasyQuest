import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites";
import ModeratorList from "./Components/modList.js";
import Search_result from "./pages/Search_result.js";
<<<<<<< HEAD
=======
import YourFormComponent from "./Components/form.js";
import ModManagement from "./pages/mod_management.js"
>>>>>>> a1106402 (added Moderator app  and relevant api change)
import Login_page from "./pages/Login_page";
import Register_page from "./pages/Register_page";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import "./index.css";
import ModPage from "./pages/mod_start_page.js";
import ModEditPage from "./pages/mod_edit_page.js";
import YourForm from "./pages/Editor.js";
import Moderators from "./pages/moderators.js";
import ModalEditJSON from "./Components/model_edit_json.js";
function App() {
  return (

<<<<<<< HEAD



    <Router>
      <Routes>
        <Route path="/edit-article/:articleId" element={<ModEditPage></ModEditPage>} />
        <Route path="/edit-article-form/:articleId" element={<ModalEditJSON/>} />
        <Route path="/" element={<Moderators />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/Settings" element={<Settings />}></Route>
        <Route path="/Favorites" element={<Favorites />}></Route>
        <Route path="/Login" element={<Login_page />}></Route>
        <Route path="/Register" element={<Register_page />}></Route>
        <Route path="/Search_result" element={<Search_result />}></Route>
        <Route path="/ModPage" element={<ModPage />}></Route>
      
      </Routes>
    </Router>
=======
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
>>>>>>> a1106402 (added Moderator app  and relevant api change)


  );
}

export default App;
