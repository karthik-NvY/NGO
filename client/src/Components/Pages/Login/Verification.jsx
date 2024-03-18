import React from "react";
import { useState, useEffect } from "react";
import "./Verification.css";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

// import causecraft_logo from "../../Assets/causecraft_logo.png";

function Verification() {
  const [userData, setUserData] = useState(null);
  const [otp, setOtp] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleVerify = async(e) => {
    e.preventDefault();
    // Implement your verify logic here

    const { email } = userData;

    try {
      const response = await Axios.post(`${apiUrl}/otp/validate-otp`, { email , otp });
      console.log('OTP is verfied', response.data);
      handleSubmit(e);
      // navigate("/Verification");
      
    } catch (error) {
      console.error('OTP verification failed', error);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    const { name, email , password} = userData;
    try {
      const response = await Axios.post(`${apiUrl}/user/signup`, { name, email , password });
      console.log('Registration Successful', response.data);
      // handleSubmit(e);
      navigate("/login");
      
    } catch (error) {
      console.error('Registration failed', error);
      console.error('Error Message:', error.response.data.message);
    }
  }

  const handleOtp = (e) => {
    const inputvalue = e.target.value;
    setOtp(inputvalue);
    console.log(inputvalue);
  }

  return (
   
     
      <div className="container-verification">
        <h1>Verification</h1>
        <h2>Please Enter the OTP to verify your account</h2>
        <div className="input-verification">
          <input 
          type="number" 
          value={otp}
          onChange={handleOtp}
          required/>
        </div>
        <div className="submit-container-verification">
          {/* Buttons to toggle between Register and Login */}
          <div className="submit-verification">
            <button onClick={handleVerify}>Verify OTP</button>
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
