// User.js
import React from "react";

function User({ name, title }) {
  return (
    <div className="user">
      <p>Name: {name}</p>
      <p>Title: {title}</p>
    </div>
  );
}

export default User;
