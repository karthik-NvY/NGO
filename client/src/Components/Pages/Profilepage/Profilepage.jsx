// Profilepage.js

import React from 'react';
import './Profilepage.css';
import causecraft_logo from '../../Assets/causecraft_logo.png';
import profile_icon from '../../Assets/user-icon.webp';
import home_icon from '../../Assets/home-icon.png'; 

const UserName = 'Username';
export const Profilepage = () => {
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
        
        

        
        <div className="middle-container">
          <p>{UserName}</p>
        </div>

      

        <div className="footer-container">
          <div className="footer-button">As a volunteer in NGOs</div>
          <div className="footer-button">As a donor in NGOs</div>
          <div className="footer-button">As an executive in NGOs</div>
        </div>
        
      </div>
    </div>
  );
};
