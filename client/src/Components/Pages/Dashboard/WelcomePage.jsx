import React from "react";
import "./WelcomePage.css";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo_big.png";

function WelcomePage() {
  return (
    <div className="container-welcome">
      <div className="nav-bar">
        <div className="logo">
          <img src={logo} alt="" className="logoimg" />
          <h1>CauseCraft</h1>
                
        </div>
        <div className="login-signup">
          <Link to="/login" className="Loginn">
            Login
          </Link>
          <Link to="/signup" className="Signupp">
            Sign Up
          </Link>
        </div>
      </div>
      <div className="main-container">
        {/* <img src={welcome} alt="" /> */}
       
          <span className="first-line">
            <p>
              "Empower NGO's worldwide with an intuitive website hosting platform
                where simplicity meets impact"
            </p>
          </span >
  
      </div>

      {/* About Us */}
      <div className="about-us-container">
        <h1>About Us</h1>
        <h3>Create a website </h3>
        <p>
          Choose from any of our industry-leading website templates, designer
          fonts and colour pallets. Share your and services set up an e-commerce
          store and boodesigner fonts and colour pallets.
        </p>
        <h3> Share your services</h3>
        <p>
          Advertise what, where, and why you do what you do. Let a volunteer
          join or donate and contribute to your cause.
        </p>
        <h3>Market your NGO</h3>
        <p>
          Social tools make it easy to retain customers and volunteers to grow
          your base.
        </p>
      </div>

      {/* Footer */}
      <div className="footer-container">
        <div className="part1">Connect With Us</div>
        <div className="part2">
          <div className="address">
            Main Office <br />
            <div>
              IIT Ropar, <br />
              Kotla Nihang, <br />
              Punjab, <br />
              140001. <br />
            </div>
          </div>
          <div className="social-media-address">
            Social Media <br />
            <div>
              <a href="https://www.facebook.com">Facebook</a> <br />
              <a href="https://www.google.com">Google</a> <br />
              <a href="https://www.instagram.com">Instagram</a> <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
