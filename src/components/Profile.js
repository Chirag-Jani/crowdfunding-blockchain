import React from "react";
import { Link } from "react-router-dom";

function Profile(props) {
  const { userLoggedIn, loggedInUserInfo } = props;

  if (userLoggedIn) {
    return (
      <div className="text-center m-5">
        <h1>Your Profile</h1>
        <div className="text-start d-flex flex-column">
          <label>Name:</label> {loggedInUserInfo.name}
          <label>Email:</label> {loggedInUserInfo.email}
          <label>Address:</label> {loggedInUserInfo.address}
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-center m-5">
        <h1>
          <Link to="/auth">Log in</Link> to Access Your Profile
        </h1>
      </div>
    );
  }
}

export default Profile;
