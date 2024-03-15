import React from 'react'
import './Verification.css'

const Verification = () => {
  return (
    <div className="wrapp">
        <div className="verifycard">
            <h1>OTP Verification</h1>
            <p>Otp is sent to your email address</p>
            <div className="inputboxes">
                <input type="text" maxLength={6} autoFocus/>
            </div>
            <button>Verify</button>
        </div>
    </div>
  )
}

export default Verification;
