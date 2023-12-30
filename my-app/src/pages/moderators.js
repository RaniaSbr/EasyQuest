import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar_admin";
import "../Styles/admin.css";
import SearchField from "../Components/SearchField";
import User from "../Components/user";
import Navbar_Admin from "../Components/Navbar_admin";

function Moderators(params) {
  const searchPlaceholder = "Search...";

  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [activeButton, setActiveButton] = useState("All");

  const users = [
    { id: 1, name: "User1", title: "Admin" },
    { id: 2, name: "User2", title: "Moderator" },
    { id: 3, name: "User3", title: "User" },
    // Add more users as needed
  ];

  useEffect(() => {
    setDisplayedUsers(users);
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  const handleAddClick = () => {
    // Handle the "Add" button click logic here
    console.log("Add button clicked");
  };

  const handleFilterClick = (title) => {
    setActiveButton(title);
    // Filter the users based on the title (e.g., 'All', 'Moderator')
    const filteredUsers = title === "All" ? users : users.filter((user) => user.title === title);
    setDisplayedUsers(filteredUsers);
  };

  const handleDeleteClick = (id) => {
    // Delete the user with the specified ID
    const updatedUsers = displayedUsers.filter((user) => user.id !== id);
    setDisplayedUsers(updatedUsers);
  };

  return (
    <div className="admin">
      <Navbar_Admin/>
      <div className="admin_part1">
        <div className="search-add">
          <SearchField placeholder={searchPlaceholder} />
          <button className="add-button" onClick={handleAddClick}>
            <div>
              <img className="add_img" src="./Assets/add.svg" alt="Add Icon" />
              <p>Add</p>
            </div>
          </button>
        </div>
      </div>
      <div className="admin_part1">
        <div className="filter">
          <button
            className={`all-button ${activeButton === "All" ? "active-button" : "inactive-button"}`}
            onClick={() => handleFilterClick("All")}
          >
            <p>All</p>
          </button>
          <button
            className={`mod-button ${activeButton === "Moderator" ? "active-button" : "inactive-button"}`}
            onClick={() => handleFilterClick("Moderator")}
          >
            <p>Moderateurs</p>
          </button>
        </div>
      </div>
      <div className="admin_part1">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-header">
              <td colSpan="2"></td>
            </tr>
            {displayedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.title}</td>
                <td>
                  <button className="edit-button">Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteClick(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Moderators;
