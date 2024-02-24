import React from 'react'
import './Navbar.css'
import logo from '../../Assets/causecraft_logo.png'

export const Navbar = () => {
  return (
    <div>
      <div className="Navbar-header">
     
     

      <div className="Navbar-logo-section">
       <img src={logo} alt="" className='Navbar-logo-img'/>
       <p>Causecraft</p> 
      </div>

      <div className="Navbar-button-conatainer">
       <button className='Navbar-button'>
           Home
       </button>

       <button className='Navbar-button'>
           Profile
       </button>

       <button className='Navbar-button'>
           Logout
       </button>
      </div>

      </div>

    </div>
  )
}
