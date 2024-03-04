import React from 'react'
import causecraft_logo from '../../Assets/causecraft_logo.png';
import profile_icon from '../../Assets/user-icon.webp';
import Navbar from '../Navbar/Navbar';
import './Homepage.css'

const Homepage = () => {
  return (
    <>
    {/* <div className='Homepage-body'> */}

      <div className="Homepage-container">
      
      <Navbar/>
      
      <div className="Homepage-body-container">
        <div className="Homepage-main-body-container">

          <div className="Homepage-mainbody-container-header">
               NGO's Websites
          </div>

          <div className="Homepage-mainbody-container-sample-image-section">
                image section
           </div>

           
            <div className="Homepage-mainbody-container-footer">
              <div className="Homepage-footer-container">
              <p className='Homepage-footer-text'>Wanna add your Website ?</p>
               <button className='Homepage-footer-button'>Build your own website</button>
               </div>
            </div>

          
        </div>

       
      </div>
      </div>
      
      </>
  )
}



export  default Homepage;