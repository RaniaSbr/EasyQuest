import React from "react";
import Navbar from "../Components/Navbar";
import Profile_compo from "../Components/Profile_compo";
import Register from "../Components/Register";

function Profile(params) {
  return (
    <div className="profile">
      <Navbar></Navbar>

      {/* <div className="w-screen h-screen  flex items-center justify-center">
        <Profile_compo></Profile_compo>
      </div> */}
      <Register></Register>

    </div>
  );
}
export default Profile;
