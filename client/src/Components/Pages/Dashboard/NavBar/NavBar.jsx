import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
// import { IoMdListBox } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
// import { FaSearch } from "react-icons/fa";
import logo from "../../../Assets/logo_big.png";
import "./NavBar.css";
// import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = () => {
  // const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.clear();
      // const response = await Axios.post(
      //   `${apiUrl}/user/logout`,
      //   {},
      //   { withCredentials: true }
      // );
      console.log("Logout successful");
      navigate("/");
    } catch {
      console.error("logout failed");
    }
  };

  return (
    <div className="navbar">
      <div className="causecraft">
        <div className="logo">
          <img src={logo} alt="" className="logoimg" />
        </div>      
        <div className="text">CauseCraft</div>
      </div>

      {/* <div className="searchbox">
        <input type="text" placeholder="Search for NGOs" />
        <FaSearch size={20} className="search"/>
      </div> */}

      <ul>
        <li>
            <Link to="/home"><button><AiFillHome className="icon" size={25} /></button></Link>
        </li>
        {/* <li>
          <button>
            <IoMdListBox className="icon" size={25} />
          </button>
        </li> */}
        <li>
            <Link to="/profile"><button><FaUserCircle className="icon" size={25} /></button></Link>
        </li>
        <li>
          <button onClick={handleLogout}>
            <IoLogOut className="icon" size={25} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
