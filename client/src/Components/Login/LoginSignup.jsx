import React, { useState } from "react";
import "./LoginSignup.css";

import { FaRegUser  } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { RiLockPasswordLine , RiLockPasswordFill } from "react-icons/ri";


// import user_icon from "../Assets/user-icon.webp";
// import email_icon from "../Assets/email-logo.png";
// import password_icon from "../Assets/password-logo.jpeg";
// import password_lock_icon from "../Assets/password-lock.avif";
import causecraft_icon from "../Assets/causecraft_pic.png";

export const LoginSignup = () => {
  // State to manage the action (Register or Login)
  const [action, setAction] = useState("Register");

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
        <div className="inputs">
          {action === "Login" ? (
            <div></div>
          ) : (
            <div className="input">
              < FaRegUser className="icon user-icon"/>
              <input type="text" name="UserId" id="" placeholder="Username" />
            </div>
          )}

          <div className="input">
          < MdAttachEmail className="icon email-icon"/>
            <input type="email" name="UserId" id="" placeholder="Email Id" />
          </div>
          <div className="input">
          < RiLockPasswordLine className="icon password-icon"/>
            <input type="password" name="UserId" id="" placeholder="Password" />
          </div>
          {action==="Login" ? (
            <div></div>
          ):
          <div className="input">
            < RiLockPasswordFill className="icon password-icon"/>
            <input type="password" name="UserId" id="" placeholder="Re-enter Password" />
          </div>
            }
        </div>
        {/* Forgot Password section, visible only during Login */}
        {action === "Register" ? (
          <div></div>
        ) : (
          <div className="forgot-password">
            Forgot Password?  <span><u>Click Here</u></span>
          </div>
        )}

        <div className="submit-container">
          {/* Buttons to toggle between Register and Login */}
          <div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("Register");
            }}
          >
            Register
          </div>
          <div
            className={action === "Register" ? "submit gray" : "submit"}
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
}

export default LoginSignup;
