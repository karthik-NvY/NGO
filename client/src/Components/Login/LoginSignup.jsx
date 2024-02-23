import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

import { FaRegUser } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";

import causecraft_icon from "../Assets/causecraft_pic.png";
// import Verification from "./Verification"; // Import the Verification component

export const LoginSignup = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // State to manage the action (Register or Login)
  const [action, setAction] = useState("Register");

  // Function to handle registration and navigation to verification component
  const handleRegister = () => {
    // Perform registration logic here
    // alert("HII")
    // After successful registration, navigate to verification component
    navigate("/Verification");
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
              <input type="text" name="UserId" id="" placeholder="Username" />
            </div>
          )}

          <div className="input-login">
            <MdAttachEmail className="icon email-icon" />
            <input type="email" name="UserId" id="" placeholder="Email Id" />
          </div>
          <div className="input-login">
            <RiLockPasswordLine className="icon password-icon" />
            <input
              type="password"
              name="UserId"
              id=""
              placeholder="Password"
            />
          </div>
          {action === "Login" ? (
            <div></div>
          ) : (
            <div className="input-login">
              <RiLockPasswordFill className="icon password-icon" />
              <input
                type="password"
                name="UserId"
                id=""
                placeholder="Re-enter Password"
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
            onClick={() => {
              handleRegister();
              setAction("Register");
            }}
          >
            Register
          </div>
          <div
            className={action === "Register" ? "submit-login gray" : "submit-login"}
            onClick={() => {
              setAction("Login");
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
