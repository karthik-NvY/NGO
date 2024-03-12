import React from 'react'
import './Register.css'
// import logo from '../../../Assets/CauseCraft_logo.png'
import { FaUser } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { TbLockOpen } from "react-icons/tb";
import { TbLockCheck } from "react-icons/tb";

const Register = () => {
    return (
        <div className="wrap">
            <div className="left">
            <div className="backimg"></div>
                {/* <img src={logo} alt="logo" /> */}
                <h1>CauseCraft</h1>
                <div className="login">
                <p>Already have an account? <button>Login</button></p>
                </div>
    
            </div>
    
            <div className="right">
            
            <form action="">
                <h2>Register</h2>
    
                <div className="inputbox">
                    <input 
                    type="text" 
                    placeholder='Username'
                    required
                    />
                    <FaUser className='icon'/>
                </div>
    
                <div className="inputbox">
                    <input 
                    type="email" 
                    placeholder='Email'
                    required
                    />
                    <TfiEmail className='icon'/>
                </div>
    
                <div className="inputbox">
                    <input 
                    type="password" 
                    placeholder='Password'
                    required
                    />
                    <TbLockOpen className='icon'/>
                </div>
    
                <div className="inputbox">
                    <input 
                    type="password" 
                    placeholder='Confirm Password' 
                    required
                    />
                    <TbLockCheck className='icon'/>
                </div>
    
                <div className="inputbox" id='getotp'>
                    <button>Get OTP</button>
                </div>
            </form>
            </div>
        </div>
      )
}

export default Register;
