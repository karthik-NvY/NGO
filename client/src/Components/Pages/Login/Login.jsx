import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { TfiEmail } from "react-icons/tfi";
import { TbLockOpen } from "react-icons/tb";
import Axios from "axios";

const Login = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
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
      console.log("login successful", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      console.error("login failed", error);
    }
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
        <form action="">
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
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handlePassword}
              required
            />

            <TbLockOpen className="icon" />
          </div>

          <div className="inputbox" id="login">
            <button onClick={(e) => handleSubmit(e)}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
