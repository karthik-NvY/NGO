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
  const [donor, setDonor] = useState([]);
  const [Executive, setExecutive] = useState([]);
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
        let volunteer_d = [];
        let executive_d = [];
        let donor_d = [];
        for (let i = 0; i < response.data.data.ngos.length; i++) {
          if (response.data.data.ngos[i].role === 'volunteer') {
            volunteer_d.push(response.data.data.ngos[i]);
          }
          if (response.data.data.ngos[i].role === 'donor') {
            donor_d.push(response.data.data.ngos[i]);
          }
          if (response.data.data.ngos[i].role === 'executive') {
            executive_d.push(response.data.data.ngos[i]);
          }
        }
        setVolunteer(volunteer_d);
        setDonor(donor_d);
        setExecutive(executive_d);
        
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  console.log(volunteer);
  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };

  const handleViewClick = (ngoId) => {
    localStorage.setItem("ngo_id", ngoId);
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
          <div className="rightpart">
  {volunteer.length > 0 && (
    <div className="right-volunteer">
      <section id="volunteer">
        <h1 className="roles">Volunteer</h1>
        {volunteer.map((ngo) => (
          <a href={`/ngo/${ngo.ngo_name}/${ngo.ngo_id}`} key={ngo.ngo_id} onClick={() => handleViewClick(ngo.ngo_id)} className="ngo-link">
            <div className="ngo_v">
              <Ngo name={ngo.ngo_name} />
            </div>
          </a>
        ))}
      </section>
    </div>
  )}
  
  {donor.length > 0 && (
    <div className="right-donor">
      <section id="donor">
        <h1 className="roles">Donor</h1>
        {donor.map((ngo) => (
          <a href={`/ngo/${ngo.ngo_name}/${ngo.ngo_id}`} key={ngo.ngo_id} onClick={() => handleViewClick(ngo.ngo_id)} className="ngo-link">
            <div className="ngo_v">
              <Ngo name={ngo.ngo_name} />
            </div>
          </a>
        ))}
      </section>
    </div>
  )}
  
  {Executive.length > 0 && (
    <div className="right-executive">
      <section id="executive">
        <h1 className="roles">Executive</h1>
        {Executive.map((ngo) => (
          <a href={`/ngo/${ngo.ngo_name}/${ngo.ngo_id}`} key={ngo.ngo_id} onClick={() => handleViewClick(ngo.ngo_id)} className="ngo-link">
            <div className="ngo_v">
              <h1>{ngo.ngo_name}</h1>
            </div>
          </a>
        ))}
      </section>
    </div>
  )}
</div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
