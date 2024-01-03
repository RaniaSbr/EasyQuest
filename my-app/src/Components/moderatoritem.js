// ModeratorItem.js
import React from "react";

const ModeratorItem = ({ user, editUserId, onEditChange, onEditSubmit, onDeleteClick, onShowPasswordClick, onEditClick }) => {
  return (
    <tr key={user.id}>
      <td>
        {editUserId === user.id ? (
          <input
            type="text"
            value={user.name}
            onChange={(e) => onEditChange(e.target.value, 'name')}
          />
        ) : user.name}
      </td>
      <td>
        {editUserId === user.id ? (
          <input
            type="text"
            value={user.title}
            onChange={(e) => onEditChange(e.target.value, 'title')}
          />
        ) : user.title}
      </td>
      <td>
        {editUserId === user.id ? (
          <button onClick={() => onEditSubmit(user.id, { username: user.name, email: user.title })}>
            Submit
          </button>
        ) : (
          <>
            <button className="show-password-button" onClick={() => onShowPasswordClick(user.id)}>
              Show Password
            </button>
            <button className="delete-button" onClick={() => onDeleteClick(user.id)}>
              <img className="delete_img" src="./Assets/trash.svg" alt="Trash Icon" />
            </button>
            <button className="edit-button" onClick={() => onEditClick(user.id)}>
              <img className="edit_img" src="./Assets/treepoint.svg" alt="Treepoint Icon" />
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default ModeratorItem;
