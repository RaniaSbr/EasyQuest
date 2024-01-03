// src/pages/Moderators.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/admin.css";
import SearchField from "../Components/SearchField";
import Navbar_Admin from "../Components/Navbar_admin";
import AddContainer from "../Components/AddContainer";
import ModeratorForm from "../Components/InserModerateur";

function Moderators(params) {
  const searchPlaceholder = "Search...";
  const [searchValue, setSearchValue] = useState('');
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [moderators, setModerators] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

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
  }, []);  // Remove displayedUsers from the dependency array

  const users = moderators.map((moderateur) => ({
    id: moderateur.id,
    name: moderateur.username,
    title: moderateur.email,
  }));

  useEffect(() => {
    const updatedUsers = moderators.map((moderateur) => ({
      id: moderateur.id,
      name: moderateur.username,
      title: moderateur.email,
    }));

    setDisplayedUsers(updatedUsers);
  }, [moderators]);

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
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
      const { real_password, password } = response.data;
      alert(`Real Password: ${real_password}\nHashed Password: ${password}`);
    } catch (error) {
      console.error('Error fetching passwords:', error);
    }
  };

  const handleEditClick = (id) => {
    setEditUserId(id);
    // Implement logic to open a form for editing the user
  };

  const handleEditSubmit = async (id, updatedUserData) => {
    try {
      const currentUser = moderators.find((user) => user.id === id);
      const currentPassword = currentUser ? currentUser.password : '';
  
      // Include the current password in the request
      const requestData = {
        ...updatedUserData,
        password: currentPassword,
      };
  
      // Log the data before making the request
      console.log('Updated User Data:', requestData);
  
      await axios.put(`http://localhost:8000/ModerateurManager/update/${id}/`, requestData);
      setEditUserId(null);
      // You may want to fetch the updated list of users here
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  
  const handleEditChange = (value, field) => {
    // Update the edited user data in the state
    const updatedUsers = displayedUsers.map((user) => {
      if (user.id === editUserId) {
        return {
          ...user,
          [field]: value,
        };
      }
      return user;
    });
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
      <Navbar_Admin />

      {/**Search&add button */}
      <div className="admin_part1">
        <div className="search-add">
          <SearchField
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => handleSearchChange(e)}
          />
          <button className="add-button" onClick={handleAddClick}>
            <div>
              <img className="add_img" src="./Assets/add.svg" alt="Add Icon" />
              <p>Add</p>
            </div>
          </button>
        </div>
      </div>

      {/**Users List */}
      <div className="admin_part1">
        <div className="user-list">
          {displayedUsers.map((user) => (
            <div key={user.id} className="user-item">
              {/* First Column: User Name and Email */}
              <div className="user-info">
              <p className={`user-name ${editUserId === user.id ? 'bold-text' : ''}`}>
               {editUserId === user.id ? (
                 <input
                   type="text"
                   value={user.name}
                   onChange={(e) => handleEditChange(e.target.value, 'name')}
                 />
               ) : user.name}
               </p>
               <p className="user-mail">
                 {editUserId === user.id ? (
                   <input
                     type="text"
                     value={user.title}
                     onChange={(e) => handleEditChange(e.target.value, 'title')}
                   />
                 ) : user.title}
               </p>
            </div>

              {/* Second Column: Show Password Button */}
              <div className="user-action">
                {editUserId !== user.id && (
                  <button className="show-password-button" onClick={() => handleShowPasswordClick(user.id)}>
                    Show Password
                  </button>
                )}
              </div>

              {/* Third Column: Delete and Threepoint Buttons */}
              <div className="user-action">
                {editUserId === user.id ? (
                  <button onClick={() => handleEditSubmit(user.id, { username: user.name, email: user.title })}>
                    Submit
                  </button>
                ) : (
                  <>
                    <button className="delete-button" onClick={() => handleDeleteClick(user.id)}>
                      <img className="delete_img" src="./Assets/trash.svg" alt="Trash Icon" />
                    </button>
                    <button className="edit-button" onClick={() => handleEditClick(user.id)}>
                      <img className="edit_img" src="./Assets/pen.svg" alt="Treepoint Icon" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/**Add Container */}
      {showAddModal && <AddContainer onClose={handleCloseAddModal}>
        <ModeratorForm />
      </AddContainer>}
    </div>
  );
}

export default Moderators;
