import React, { useState, useEffect, useRef } from "react";
import { IoCamera } from "react-icons/io5";
import NavBar from "../Dashboard/NavBar/NavBar";
import axios from "axios";
import "./Profile.css";
import setAuthHeaders from "../../Utils/setAuthHeaders";
import Ngo from "../Dashboard/Ngo";

export const Profile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [userData, setUserData] = useState(null);
  const [volunteer, setVolunteer] = useState([]);
  const fileInputRef = useRef(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchUserProfile(); // Fetch user profile data when component mounts
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      setAuthHeaders(token);
      const response = await axios.post(`${apiUrl}/user/profile`, { token }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      setUserData(response.data.data);
      console.log(response.data);

      // Check userData and process ngos array after it's set
        
        console.log("asdaadas");
        let volunteerd = [];
        let executive = [];
        let donor = [];
        for (let i = 0; i < response.data.data.ngos.length; i++) {
          if (response.data.data.ngos[i].role === 'volunteer') {
            volunteerd.push(response.data.data.ngos[i]);
          }
          if (response.data.data.ngos[i].role === 'donor') {
            donor.push(response.data.data.ngos[i]);
          }
          if (response.data.data.ngos[i].role === 'executive') {
            executive.push(response.data.data.ngos[i]);
          }
        }
        setVolunteer(volunteerd);
        console.log(volunteerd);
        
        console.log(executive);
        console.log(donor);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  console.log(volunteer);
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
                {Array.isArray(volunteer) && volunteer.map((ngo) => (
                  <a href={`/ngo/${ngo.ngo_name}/${ngo._id}`} key={ngo._id} className="ngo-link">
                     <div className="ngo_v">
                      <Ngo name={ngo.ngo_name} />
                     </div>
                 </a>
        ))}
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
