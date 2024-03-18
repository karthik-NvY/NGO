import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
// import { IoMdListBox } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import logo from "../../../Assets/logo_big.png";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="" className="logoimg" />
        <h1>CauseCraft</h1>
      </div>

      <div className="searchbox">
        <input type="text" placeholder="Search for NGOs" />
        <FaSearch size={20} className="search" />
      </div>

      <ul>
        <li>
          <Link to="/home">
            <button>
              <AiFillHome className="icon" size={25} />
            </button>
          </Link>
        </li>
        {/* <li>
          <button><IoMdListBox className="icon" size={25}/></button>
        </li> */}
        <li>
          <Link to="/profile">
            <button>
              <FaUserCircle className="icon" size={25} />
            </button>
          </Link>
        </li>
        <li>
          <button>
            <IoLogOut className="icon" size={25} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
