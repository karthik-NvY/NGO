import React, { useState, useEffect, useRef } from "react";
import { IoCamera } from "react-icons/io5";
import NavBar from "../Dashboard/NavBar/NavBar";
import axios from "axios";
import "./Profile.css";
import { Link } from "react-router-dom";
import Ngo from "../Dashboard/Ngo";

export const Profile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [userData, setUserData] = useState(null);
  const [volunteerNgos, setVolunteerNgos] = useState([]);
  const [donorNgos, setDonorNgos] = useState([]);
  const [executiveNgos, setExecutiveNgos] = useState([]);
  const fileInputRef = useRef(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchUserProfile(); // Fetch user profile data when component mounts
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiUrl}/user/profile`,
        { token },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUserData(response.data.data);
      setVolunteerNgos(
        response.data.ngos.filter((ngo) => ngo.role === "volunteer")
      );
      setDonorNgos(response.data.ngos.filter((ngo) => ngo.role === "donor"));
      setExecutiveNgos(
        response.data.ngos.filter((ngo) => ngo.role === "executive")
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
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
            {userData && (
              <>
                <p className="username">{userData.name}</p>
                <div>
                  <p className="email">{userData.email}</p>
                </div>
              </>
            )}
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
                <div className="websites">
                  {volunteerNgos.map((ngo) => (
                    <div key={ngo.id}>
                      <Ngo name={ngo.name} creator={ngo.admin} />
                      <Link to={`/volunteer/${ngo.id}`}>Details</Link>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <div className="right-donor">
              <section id="donor">
                <p>Donor</p>
                <div className="websites">
                  {donorNgos.map((ngo) => (
                    <div key={ngo.id}>
                      <Ngo name={ngo.name} creator={ngo.admin} />
                      <Link to={`/donor/${ngo.id}`}>Details</Link>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <div className="right-executive">
              <section id="executive">
                <p>Executive</p>
                <div className="websites">
                  {executiveNgos.map((ngo) => (
                    <div key={ngo.id}>
                      <Ngo name={ngo.name} creator={ngo.admin} />
                      <Link to={`/executive/${ngo.id}`}>Details</Link>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
