import React from "react";
import { useState } from "react";
import "./Verification.css";

import causecraft_logo from "../Assets/causecraft_logo.png";

function Verification() {
  return (
   
     
      <div className="container-verification">
        <h1>Verification</h1>
        <h2>Please Enter the OTP to verify your account</h2>
        <div className="input-verification">
          <input type="text" />
        </div>
        <div className="submit-container-verification">
          {/* Buttons to toggle between Register and Login */}
          <div className="submit-verification">
            <span>Verify OTP</span>
          </div>

          <div className="resend-otp">
            Didn't get the code?{" "}
            <span>
              <u>Resend</u>
            </span>
          </div>
        </div>
      </div>
  
  );
}

export default Verification;
