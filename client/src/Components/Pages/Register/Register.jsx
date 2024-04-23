import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { Link } from "react-router-dom";
import Axios from "axios";
// import logo from '../../../Assets/CauseCraft_logo.png'
import { FaUser } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { TbLockOpen } from "react-icons/tb";
import { TbLockCheck } from "react-icons/tb";

const Register = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmpassword, setCPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCPassword = (e) => {
    const inputvalue = e.target.value;
    setCPassword(inputvalue);
  };

  const navigate = useNavigate(); // Initialize the navigate function

  localStorage.setItem("userData", JSON.stringify(userData)); //data store in local storage

  // Function to handle registration and navigation to verification component
  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password } = userData;
    // Perform registration logic here
    // alert("HII")
    // After successful registration, navigate to verification component
    if (userData.password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await Axios.post(`${apiUrl}/otp/get-otp`, { email });
      console.log("OTP sent", response.data);
      navigate("/Verification");
    } 
    catch (error) {
      if (error.response.status === 409 && error.response.data.message === "User already exists"){
        alert("Account already exists. Login to continue");
      }
      if (error.response.status === 400 && error.response.data.message === "Missing credentials"){
        alert("Missing credentials");
      }
    }
  };
  return (
    <div className="wrap">
      <div className="left">
        <div className="backimg"></div>
        {/* <img src={logo} alt="logo" /> */}
        <h1>CauseCraft</h1>
        <div className="login">
          <p>
            Already have an account?{" "}
            <Link to="/login">
              <button>Login</button>
            </Link>
          </p>
        </div>
      </div>

      <div className="right">
        <form onSubmit={(e) => handleRegister(e)} action="">
          <h2>Register</h2>

          <div className="inputbox">
            <input
              type="text"
              placeholder="Username"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
            <FaUser className="icon" />
          </div>

          <div className="inputbox">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
            <TfiEmail className="icon" />
          </div>

          <div className="inputbox">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
            <TbLockOpen className="icon" />
          </div>

          <div className="inputbox">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmpassword"
              value={confirmpassword}
              onChange={handleCPassword}
              required
            />
            <TbLockCheck className="icon" />
          </div>

          <div className="inputbox" id="getotp">
            <button type="submit">Get OTP</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
