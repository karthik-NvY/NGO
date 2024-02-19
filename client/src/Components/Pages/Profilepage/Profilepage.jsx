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
        
        

        <div className="rest-body-container">

        
        <div className="username-container">
          <p>{UserName}</p>
        </div>

      <div className="profile-container">
        <img src={profile_icon} alt="Profile icon" className='profile-icon'  />
      </div>
       
       <div className="footer-container">

        <div className="footer-button-container">
          <div className="footer-button">As a volunteer in NGOs</div>
          <div className="footer-button">As a donor in NGOs</div>
          <div className="footer-button">As an executive in NGOs</div>
        </div>

        <div className="list-container">
          <li><a href="" className='ngo-name'>abc</a></li>
          <li><a href="" className='ngo-name'>abc</a></li>
          <li><a href="" className='ngo-name'>abc</a></li>
          <li><a href="" className='ngo-name'>abc</a></li>
          
             
        </div>

        </div>
        </div>
      </div>
    </div>
  );
};
