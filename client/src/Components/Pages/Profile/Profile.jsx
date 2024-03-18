import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import "./Profile.css";

const Profile = () => {
  const [profilePic, setProfilePic] = useState(""); // State to store the selected profile picture

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // You can handle the file as needed, for example, displaying a preview
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div className="userprofile">
      <div className="gradiant"> </div>
      <div className="profile-down">
        <label htmlFor="profilePicInput">
          {profilePic ? (
            <img src={profilePic} alt="Profile" className="profile-pic" />
          ) : (
            <div className="profile-icon-wrapper">
              <BsFillPersonFill size={150} className="profile-icon" />
            </div>
          )}

          <input
            type="file"
            id="profilePicInput"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
      </div>
      <div className="separator"></div>
    </div>
  );
};

export default Profile;
