import React, { useState } from 'react';
import './Login.css';
import Axios from 'axios';


const Login = () => {

  const apiUrl = process.env.REACT_API_URL;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e) => {
    const inputvalue = e.target.value;
    setEmail(inputvalue);
  }

  const handlePass = (e) => {
    const inputvalue = e.target.value;
    setPassword(inputvalue);
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    // Implement your login logic here
    console.log('User ID:', userId);
    console.log('Password:', password);

    try {
      const response = await Axios.post(`${apiUrl}/user/login`, { email , password });
      console.log('login successful', response.data);
      // navigate("/Verification");
      
    } catch (error) {
      console.error('login failed', error);
    }

  };

  // const handleForgotPassword = () => {
  //   // Implement forgot password logic here
  //   console.log('Forgot Password');
  // };

  const handleSignUp = () => {
    // Implement sign up logic here
    console.log('Sign Up');
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input type="text" 
        value={email} 
        onChange={handleEmail} 
        required
        />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" 
        value={password} 
        onChange={handlePass} 
        required
        />
      </div>
      <button 
      onClick={(e) => {handleLogin(e)}}>Login</button>
      {/* <button onClick={handleForgotPassword}>Forgot Password</button> */}
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default Login;
