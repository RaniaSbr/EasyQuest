import React from "react";
import Navbar from "../Components/Navbar";
import ProfileComponent from "../Components/ProfileComponent";
function Profile(params) {
  return (
    <div className="profile">
      <Navbar></Navbar>
      <ProfileComponent></ProfileComponent>
    </div>
  );
}
export default Profile;
