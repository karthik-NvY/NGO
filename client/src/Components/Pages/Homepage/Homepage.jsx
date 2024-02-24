import React from 'react'
import causecraft_logo from '../../Assets/causecraft_logo.png';
import profile_icon from '../../Assets/user-icon.webp';
import './Homepage.css'

export const Homepage = () => {
  return (
    <>
    {/* <div className='Homepage-body'> */}

      <div className="Homepage-container">
      
      <div className="Homepage-header-container">
          <div className="Homepage-header-logo">
            <img src={causecraft_logo} alt="Causecraft Logo" />
          </div>
          <div className="Homepage-header-home">
            <button>
              
              Profile
            </button>
          </div>
        </div>
      
      <div className="Homepage-body-container">
        <div className="Homepage-main-body-container">

          <div className="Homepage-mainbody-container-header">
               NGO's Website
          </div>

          <div className="Homepage-mainbody-container-sample-image-section">
                image section
           </div>

           
            <div className="Homepage-mainbody-container-footer">
                footer section
            </div>

          
        </div>

        {/* <div className="Homepage-notification-container">

          <div className="Homepage-notification-header">
           <p>Notification </p> 
          </div>

          <div className="Homepage-notification-main-body">
            main body
          </div>

          <button className="Homepage-notification-logout">
             Logout
           </button>
          
        </div> */}
      </div>
      </div>
      
      </>
  )
}
