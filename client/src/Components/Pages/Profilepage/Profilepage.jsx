import React, { useState, useEffect } from 'react';
import './Profilepage.css';
import causecraft_logo from '../../Assets/causecraft_logo.png';
import profile_icon from '../../Assets/user-icon.webp';
import home_icon from '../../Assets/home-icon.png';

const Profilepage = () => {
  const [userData, setUserData] = useState(null);
  const [activeButton, setActiveButton] = useState('volunteer'); // Default active button
  const [loading, setLoading] = useState(true);

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  useEffect(() => {
    // Replace 'backendApiUrl' with your actual backend API endpoint
    fetch('backendApiUrl')
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='body'>
      <div className="container">
        <div className="header-container">
          <div className="header-logo">
            <img src={causecraft_logo} alt="Causecraft Logo" />
          </div>
          <div className="header-home">
            <button>
              <img src={home_icon} alt="Home Icon" />
              Home
            </button>
          </div>
        </div>

        <div className="rest-body-container">
          <div className="username-container">
            <p>
              {/* {loading ? 'Loading...' : userData?.username} */}
              Username
              </p>
          </div>

          <div className="profile-container">
            <img src={profile_icon} alt="Profile icon" className='profile-icon' />
          </div>

          <div className="footer-container">
            <div className="footer-button-container">
              <div
                className={`footer-button ${activeButton === 'volunteer' ? 'active' : ''}`}
                onClick={() => handleButtonClick('volunteer')}
              >
                As a volunteer in NGOs
              </div>
              <div
                className={`footer-button ${activeButton === 'donor' ? 'active' : ''}`}
                onClick={() => handleButtonClick('donor')}
              >
                As a donor in NGOs
              </div>
              <div
                className={`footer-button ${activeButton === 'executive' ? 'active' : ''}`}
                onClick={() => handleButtonClick('executive')}
              >
                As an executive in NGOs
              </div>
            </div>

            <div className="list-container">
              {userData && userData[`${activeButton}NGOs`].map((ngo) => (
                <div key={ngo.id} className="content-item">
                  {ngo.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage