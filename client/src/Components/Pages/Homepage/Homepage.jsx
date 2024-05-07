import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Homepage.css";
import NavBar from "../Dashboard/NavBar/NavBar";
import Ngo from "../Dashboard/Ngo";
import setAuthHeaders from "../../Utils/setAuthHeaders";

const Homepage = () => {
  const [ngos, setNgos] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const token = localStorage.getItem("token");
        setAuthHeaders(token); 
        const response = await axios.post(`${apiUrl}/api/ngoInfo`, { token }, { withCredentials: true });
        

        if(response.status === 200 && response.data.message==="NGOs found"){
          setNgos(response.data.allNgos.reverse());
          console.log(response.data);
       }
      } catch (error) {
        if(error.response.status === 500 && error.response.data.message==="Internal server error while fetching Info of NGOs"){
          alert('internal server error');
       }
       if(error.response.status === 404 && error.response.data.message==="No NGOs found"){
        alert('No Ngos found');
     }
        console.error("Error fetching NGOs:", error);
      }
    };

    fetchNgos();
  }, [apiUrl]);

  const handleViewClick = (ngoId) => {
    localStorage.setItem("ngo_id", ngoId);
  };

  //const ngo_id = localStorage.getItem("ngo_id");

  return (
    <div className="home">
      <NavBar />
      <div className="homepage">
        <h1 className="head">Our Popular Ngos</h1>
        <div className="websites">
              {Array.isArray(ngos) &&
                ngos.map((ngo) => (
                  <a href={`/ngo/${ngo.name}/${ngo._id}`} key={ngo._id} onClick={() => handleViewClick(ngo._id)} className="ngo-link">
                    <div className="ngo">
                      <Ngo name={ngo.name} creator={ngo.admin} />
                    </div>
                  </a>
                ))}
            </div>

      </div>
      <div className="build">
        <p>Wanna add your website</p>
        <Link to="/templateEdit">
          <button>Build your own website</button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
