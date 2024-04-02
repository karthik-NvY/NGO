import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Homepage.css";
import NavBar from "../Dashboard/NavBar/NavBar";
import Ngo from "../Dashboard/Ngo";

const Homepage = () => {
  const [ngos, setNgos] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/ngoinfo`);
        setNgos(response.data);
      } catch (error) {
        console.error("Error fetching NGOs:", error);
      }
    };

    fetchNgos();
  }, []);
  return (
    <div className="home">
      <NavBar />
      <div className="homepage">
        <h1>NGO Websites</h1>
        <div className="websites">
          {ngos.map((ngo) => {
            return (<div>
              <Ngo key={ngo.id} name={ngo.name} creator={ngo.admin} />
            <Link></Link>
            </div>);
          })}
        </div>
      </div>
      <div className="build">
        <p>Wanna add your website</p>
        <button>Build your own website</button>
      </div>
    </div>
  );
};

export default Homepage;
