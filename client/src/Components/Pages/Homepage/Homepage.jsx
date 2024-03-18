import React , {useState, useEffect}from 'react'
import causecraft_logo from '../../Assets/causecraft_logo.png';
import profile_icon from '../../Assets/user-icon.webp';
import './Homepage.css'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Homepage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);


  const handleProfile = async (e) => {
    e.preventDefault();
    const {email} = userData;
    console.log("Email: ", email);

    try {
      const response = await Axios.post(`${apiUrl}/user/profile`,{email}, { withCredentials: true });
      console.log('Fetched user data', response.data);
      setUserData(response.data);
      localStorage.setItem("userData", JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching user data', error);
   }

    console.log("navigate to profile", userData);
    navigate("/profile", { state: { userData } });
  };

  return (
    <>
    {/* <div className='Homepage-body'> */}

      <div className="Homepage-container">
      
      <div className="Homepage-header-container">
          <div className="Homepage-header-logo">
            <img src={causecraft_logo} alt="Causecraft Logo" />
          </div>
          <div className="Homepage-header-home">
            <button onClick={handleProfile}>
              Profile
            </button>
          </div>
        </div>
      
      <div className="Homepage-body-container">
        <div className="Homepage-main-body-container">

          <div className="Homepage-mainbody-container-header">
               NGO's Website
          </div>

          <div className="Homepage-mainbody-container-sample-image-section">
                image section
           </div>

           
            <div className="Homepage-mainbody-container-footer">
                footer section
            </div>

          
        </div>

        <div className="Homepage-notification-container">

          <div className="Homepage-notification-header">
           <p>Notification </p> 
          </div>

          <div className="Homepage-notification-main-body">
            main body
          </div>

          <button className="Homepage-notification-logout">
             Logout
           </button>
          
        </div>
      </div>
      </div>
      
      </>
  )
}



export  default Homepage;