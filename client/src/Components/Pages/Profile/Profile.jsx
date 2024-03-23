import React, { useState, useRef } from "react";
import { IoCamera } from "react-icons/io5"; // Import the camera icon
import NavBar from "../Dashboard/NavBar/NavBar";
import "./Profile.css";

export const Profile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const fileInputRef = useRef(null);

  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // You can perform additional validation or processing here if needed
    setProfilePic(file);
  };

  return (
    <>
      <NavBar />
      <div className="Profile-container">
        <div className="profile-background">
          <div className="p-5 text-center bg-body-tertiary">
            <div className="profile-pic" onClick={handleProfilePicClick}>
              {profilePic && (
                <img src={URL.createObjectURL(profilePic)} alt="Profile" />
              )}
              {!profilePic && (
                <>
                  <IoCamera className="camera-icon" />
                  {/* Icon for camera */}
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
            <p className="username">User Name</p>
            <div className="count">
              <ul>
                <li>
                  <a href="#volunteer">Volunteer</a>
                </li>
                <li>
                  <a href="#donor">Donor</a>
                </li>
                <li>
                  <a href="#executive">Executive</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container-box">
          <div className="About">
            <p>Tasks</p>
          </div>
          <div className="rightpart">
            <div className="right-volunteer">
              <section id="volunteer">
                <p>Volunteer</p>
              </section>
            </div>
            <div className="right-donor">
              <section id="donor">
                <p>Donor</p>
              </section>
            </div>
            <div className="right-executive">
              <section id="executive">
                <p>Executive</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
