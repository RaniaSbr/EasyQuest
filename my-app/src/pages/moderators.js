
import React, { useState, useEffect } from "react";

import "../Styles/admin.css";
import SearchField from "../Components/SearchField";
import User from "../Components/user";
import Navbar_Admin from "../Components/Navbar_admin";

function Moderators(params) {
  const searchPlaceholder = "Search...";

  const [searchValue, setSearchValue] = useState('');
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [activeButton, setActiveButton] = useState("All");

  const users = [
    { id: 1, name: "Ahmed Al-Mansoori", title: "Admin" },
    { id: 2, name: "Fatima Khalid", title: "Moderator" },
    { id: 3, name: "Ali Abdullah", title: "User" },
    { id: 4, name: "Layla Ahmed", title: "Admin" },
    { id: 5, name: "Youssef Al-Farsi", title: "Moderator" },
    { id: 6, name: "Amina Hassan", title: "User" },
    { id: 7, name: "Omar Al-Maktoum", title: "Admin" },
    { id: 8, name: "Noura Ibrahim", title: "Moderator" },
    { id: 9, name: "Karim Abdel-Rahman", title: "User" },
    { id: 10, name: "Sara Al-Saud", title: "Admin" },
    { id: 11, name: "Hassan Al-Hamdi", title: "Moderator" },
    { id: 12, name: "Amira Salah", title: "User" },
    { id: 13, name: "Khalid Al-Mansour", title: "Admin" },
    { id: 14, name: "Lina Abdel-Aziz", title: "Moderator" },
    { id: 15, name: "Mahmoud Jamal", title: "User" },
  ];
  

  useEffect(() => {
    setDisplayedUsers(users);
  }, []); 

  const handleAddClick = () => {
    // Handle the "Add" button click logic here
    console.log("Add button clicked");
  };

  const handleFilterClick = (title) => {
    setActiveButton(title);
    const filteredUsers = title === "All" ? users : users.filter((user) => user.title === title);
    setDisplayedUsers(filteredUsers);
  };

  const handleDeleteClick = (id) => {
    const updatedUsers = displayedUsers.filter((user) => user.id !== id);
    setDisplayedUsers(updatedUsers);
  };

  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(newValue.toLowerCase())
    );
    setDisplayedUsers(filteredUsers);
  };

  return (
    <div className="admin">
      <Navbar_Admin/>
      <div className="admin_part1">
        <div className="search-add">
          <SearchField
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={handleSearchChange}
          />
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
                <button className="delete-button" onClick={() => handleDeleteClick(user.id)}>
                    <img className="delete_img" src="./Assets/trash.svg" alt="Trash Icon" />
                    </button>

                <button className="edit-button">
                 <img className="edit_img" src="./Assets/treepoint.svg" alt="Treepoint Icon" />
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