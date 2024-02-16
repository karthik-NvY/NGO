import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './index.css';




import reportWebVitals from './reportWebVitals';
// import LoginSignup  from './Components/Login/LoginSignup.jsx';
// import Verification  from './Components/Login/Verification';
import HomePage from './Components/Dashboard/HomePage';
import Footer from './Components/Dashboard/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <LoginSignup /> */}
    {/* <Verification /> */}
    < HomePage />
    {/* < Footer /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
