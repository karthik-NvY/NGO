import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../Assets/causecraft_logo.png';

const Navbar = () => {
  return (
    <div>
      <div className="Navbar-header">
        <div className="Navbar-logo-section">
          <img src={logo} alt="" className="Navbar-logo-img" />
          <p>Causecraft</p>
        </div>

        <div className="Navbar-button-conatainer">
          <Link to="/home" className="Navbar-button">
            Home
          </Link>

          <Link to="/profile" className="Navbar-button">
            Profile
          </Link>

          <Link to="/login" className="Navbar-button">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
