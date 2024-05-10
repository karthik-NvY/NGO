import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
// import { IoMdListBox } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
// import { FaSearch } from "react-icons/fa";
import logo from "../../../Assets/logo_big.png";
import "./NGONavbar.css";
// import Axios from "axios";
import { useNavigate } from "react-router-dom";

const NGONavBar = ({logo, id, name}) => {
  // const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handlehomeClick = () => {
          navigate(`/ngo/${name}/${id}`);
  };

  return (
    <header className="navbar_head">
          <div className="logo1" onClick={() => handlehomeClick()}>
              <div className="logopic1">
                {/* Check if logo exists before rendering */}
                {logo && <img src={logo} alt="Logo" className="logo-img1"/>}
              </div>
              <div className="logo-name1">
                {name}
              </div>            
          </div>
          <nav>
            <ul>
              <li>
                <a href="#Home">Home</a>
              </li>
              <li>
                <a href="#AboutUs">About Us</a>
              </li>
              <li>
                <a href="#Events">Recent Events</a>
              </li>
              <li>
                <a href="#ContactUs">Contact Us</a>
              </li>
            </ul>
          </nav>
        </header>
  );
};

export default NGONavBar;
