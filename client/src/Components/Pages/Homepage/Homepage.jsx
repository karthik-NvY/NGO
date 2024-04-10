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
        setNgos(response.data.allNgos);
        console.log(response.data);
      } catch (error) {
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
        <div className="websites">
          {Array.isArray(ngos) &&
            ngos.map((ngo) => (
              <div className="ngo" key={ngo._id}>
                <Ngo name={ngo.name} creator={ngo.admin} />
                <Link to={`/ngo/${ngo.name}/${ngo._id}`} onClick={() => handleViewClick(ngo._id)} className="view-link">View</Link>
              </div>
            ))}
        </div>
      </div>
      <div className="build">
        <p>Wanna add your website</p>
        <Link to="/templateView"><button>Build your own website</button></Link>
      </div>
    </div>
  );
};

export default Homepage;
