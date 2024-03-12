import React from 'react'
import './Login.css'
import { TfiEmail } from "react-icons/tfi";
import { TbLockOpen } from "react-icons/tb";

const Login = () => {
    return (
        <div className="wrap">
            <div className="left">
                <div className="backimg"></div>
                <h1>CauseCraft</h1>
                <div className="signup">
                    <p>  Don't have an account? <button>Signup</button></p>
                </div>

            </div>

            <div className="right">

                <form action="">
                    <h2>Login</h2>

                    <div className="inputbox">
                        <input type="email" placeholder='Email'
                            required />

                        <TfiEmail className='icon' />

                    </div>

                    <div className="inputbox">
                        <input type="password" placeholder='Password'
                            required />

                        <TbLockOpen className='icon' />
                    </div>


                    <div className="inputbox" id='login'>
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login;
