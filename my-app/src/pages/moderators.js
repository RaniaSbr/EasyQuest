import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../Styles/admin.css";
import SearchField from "../Components/SearchField";
import Navbar_Admin from "../Components/Navbar_admin";

function Moderators(params) {
  const searchPlaceholder = "Search...";

  const [searchValue, setSearchValue] = useState('');
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [activeButton, setActiveButton] = useState("All");

  const [moderators, setModerators] = useState([]);
  useEffect(() => {
    const fetchModerators = async () => {
      try {
        const response = await axios.get('http://localhost:8000/ModerateurManager/');
        setModerators(response.data);
      } catch (error) {
        console.error('Error fetching moderators:', error);
      }
    };

    fetchModerators();
  }, [displayedUsers]);

  const users = moderators.map((moderateur) => ({
    id: moderateur.id,
    name: moderateur.username,
    title: moderateur.email,
  }));

  useEffect(() => {
    setDisplayedUsers(users);
  }, []);

  useEffect(() => {
    const updatedUsers = moderators.map((moderateur) => ({
      id: moderateur.id,
      name: moderateur.username,
      title: moderateur.email,
    }));

    setDisplayedUsers(updatedUsers);
  }, [moderators]);

  const handleAddClick = () => {
    console.log("Add button clicked");
  };

  const handleFilterClick = (title) => {
    setActiveButton(title);
    const filteredUsers = title === "All" ? users : users.filter((user) => user.title === title);
    setDisplayedUsers(filteredUsers);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/ModerateurManager/${id}/`);
      const updatedUsers = displayedUsers.filter((user) => user.id !== id);
      setDisplayedUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleShowPasswordClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/ModerateurManager/show-password/${id}/`);
      const realPassword = response.data.real_password;
      alert(`Password: ${realPassword}`);
    } catch (error) {
      console.error('Error fetching real password:', error);
    }
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
      <Navbar_Admin />
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
                  <button className="show-password-button" onClick={() => handleShowPasswordClick(user.id)}>
                    Show Password
                  </button>
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
