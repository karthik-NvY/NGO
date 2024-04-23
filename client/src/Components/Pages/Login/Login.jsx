import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { TfiEmail } from "react-icons/tfi";
import { TbLockOpen } from "react-icons/tb";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Axios from 'axios';
import setAuthHeaders from "../../Utils/setAuthHeaders";

const Login = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmail = (e) => {
    const inputvalue = e.target.value;
    setEmail(inputvalue);
  };

  const handlePassword = (e) => {
    const inputvalue = e.target.value;
    setPassword(inputvalue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const response = await Axios.post(
        `${apiUrl}/user/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log(response);
      
     if(response.status === 200 && response.data.message==="User login successful"){
      console.log("login successful", response.data);
      localStorage.setItem('token', response.data.token);
      setAuthHeaders(response.data.token);
      navigate("/home");
   }

      
    } catch (error) {

      if(error.response.status === 400 && error.response.data.message ==="User not found"){
        alert("consider signing up first");
       }
      if(error.response.status === 401 && error.response.data.message ==="Incorrect password"){
        alert("Invalid password");
      }
      if(error.response.status === 500 && error.response.data.message==="Internal server error"){
        alert("server Error Try again");
      }
      console.error("login failed", error);
    }
  };

  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="wrap">
      <div className="left">
        <div className="backimg"></div>
        <h1>CauseCraft</h1>
        <div className="signup">
          <p>
            {" "}
            Don't have an account?{" "}
            <Link to="/Signup">
              <button>Sign up</button>
            </Link>
          </p>
        </div>
      </div>

      <div className="right">
        <form onSubmit={handleSubmit}> {/* Use onSubmit event handler */}
          <h2>Login</h2>

          <div className="inputbox">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleEmail}
              required
            />

            <TfiEmail className="icon" />
          </div>

          <div className="inputbox">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              value={password}
              onChange={handlePassword}
              required
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <BsEye className="eye"/> : <BsEyeSlash  className="eye"/>} 
            </button>
            <TbLockOpen className="icon" />
          </div>
           
          <div className="inputbox"  id="login">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
