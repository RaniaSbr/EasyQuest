import React from "react";
import Navbar from "../Components/Navbar";
import Profile_compo from "../Components/Profile_Compo";

function Profile(params) {
  return (
    <div className="profile-page">
      <Navbar></Navbar>
      <div className="w-screen h-screen  flex items-center justify-center">
        <Profile_compo></Profile_compo>
      </div>
    </div>
  );
}
export default Profile;
