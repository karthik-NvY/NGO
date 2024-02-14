import React, { useState } from 'react';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('User ID:', userId);
    console.log('Password:', password);
  };

  const handleForgotPassword = () => {
    // Implement forgot password logic here
    console.log('Forgot Password');
  };

  const handleSignUp = () => {
    // Implement sign up logic here
    console.log('Sign Up');
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <div>
        <label>User ID:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleForgotPassword}>Forgot Password</button>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default Login;
