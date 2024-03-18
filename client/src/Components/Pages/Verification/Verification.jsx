import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './Verification.css'
import Axios from 'axios'

const Verification = () => {
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
      alert("Registration Successful");
      // handleSubmit(e);
      navigate("/login");
      
    } catch (error) {
      console.error('Registration failed', error);
      alert("Registration Failed");
      console.error('Error Message:', error.response.data.message);
    }
  }

  const handleOtp = (e) => {
    const inputvalue = e.target.value;
    setOtp(inputvalue);
    console.log(inputvalue);
  }
  return (
    <div className="wrapp">
        <div className="verifycard">
            <h1>OTP Verification</h1>
            <p>Otp is sent to your email address</p>
            <div className="inputboxes">
                <input 
                type="text" 
                maxLength={6} 
                name='otp'
                value={otp}
                onChange={handleOtp}
                required
                />
            </div>
            <button onClick={handleVerify}>Verify</button>
        </div>
    </div>
  )
}

export default Verification;
