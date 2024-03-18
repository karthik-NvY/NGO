import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import Axios from 'axios';

import { FaRegUser } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";

import causecraft_icon from "../../Assets/causecraft_pic.png";
// import Verification from "./Verification"; // Import the Verification component

export const LoginSignup = () => {

  const apiUrl = process.env.REACT_APP_API_URL;

  const [userData, setUserData] = useState({
    name : '',
    email : '',
    password : '',
  });

  const [confirmpassword, setCPassword] = useState('');

  const handleChange =(e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleCPassword = (e) => {
    const inputvalue = e.target.value;
    setCPassword(inputvalue);
  }

  const navigate = useNavigate(); // Initialize the navigate function
  const [action, setAction] = useState("Register");// State to manage the action (Register or Login)
  
  localStorage.setItem("userData", JSON.stringify(userData)); //data store in local storage

  const handleLogin = async(e) => {
    console.log(action);
    
    e.preventDefault();
    // Implement your login logic here

    const {email, password} = userData;

    try {
      const response = await Axios.post(`${apiUrl}/user/login`, { email , password }, {withCredentials: true});
      console.log('login successful', response.data);
      navigate("/home");
      
    } catch (error) {
      console.error('login failed', error);
    }
  }

  // Function to handle registration and navigation to verification component
  const handleRegister = async(e) => {
    e.preventDefault();

    const {name , email , password } = userData
    // Perform registration logic here
    // alert("HII")
    // After successful registration, navigate to verification component
    if(userData.password !== confirmpassword){
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await Axios.post(`${apiUrl}/otp/get-otp`, { email });
      console.log('OTP sent', response.data);
      navigate("/Verification");
      
    } catch (error) {
      console.error('Failed to send', error);
    }
  };

  return (
    <div className="big_container">
      <div className="causecraft">
        <img src={causecraft_icon} alt="causecraft-icon" />
      </div>
      <div className="container">
        {/* Header displaying the current action */}
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        {/* Inputs section, conditionally rendering Name input for Register */}
        <div className="inputs-login">
          {action === "Login" ? (
            <div></div>
          ) : (
            <div className="input-login">
              <FaRegUser className="icon user-icon" />
              <input 
              type="text" 
              name="name" 
              id="" 
              placeholder="Username" 
              value={userData.name}
              onChange={handleChange}
              required
              />
            </div>
          )}

          <div className="input-login">
            <MdAttachEmail className="icon email-icon" />
            <input 
            type="email" 
            name="email" 
            id="" 
            placeholder="Email Id"
            value={userData.email}
            onChange={handleChange}
            />
          </div>

          <div className="input-login">
            <RiLockPasswordLine className="icon password-icon" />
            <input
              type="password"
              name="password"
              id=""
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          {action === "Login" ? (
            <div></div>
          ) : (
            <div className="input-login">
              <RiLockPasswordFill className="icon password-icon" />
              <input
                type="password"
                name="confirmpassword"
                id=""
                placeholder="Re-enter Password"
                value={confirmpassword}
                onChange={handleCPassword}
                required
              />
            </div>
          )}
        </div>
        {/* Forgot Password section, visible only during Login */}
        {action === "Register" ? (
          <div></div>
        ) : (
          <div className="forgot-password">
            Forgot Password? <span><u>Click Here</u></span>
          </div>
        )}

        <div className="submit-container-login">
          {/* Buttons to toggle between Register and Login */}
          <div
            className={action === "Login" ? "submit-login gray" : "submit-login"}
            onClick={(e) => {
              handleRegister(e);
              setAction("Register");
            }}
          >
            Register
          </div>
          <div 
            className={action === "Register" ? "submit-login gray" : "submit-login"}
            onClick={(e) => {
              console.log(action)
              handleLogin(e);
              setAction("Login");
              console.log(action)
            }}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
