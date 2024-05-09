import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Homepage.css";
import NavBar from "../Dashboard/NavBar/NavBar";
import Ngo from "../Dashboard/Ngo";
import setAuthHeaders from "../../Utils/setAuthHeaders";

const Homepage = () => {
  const [ngos, setNgos] = useState([]);
  const [ngoback, setNgoback] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const token = localStorage.getItem("token");
        setAuthHeaders(token);
        const response = await axios.post(
          `${apiUrl}/api/ngoInfo`,
          { token },
          { withCredentials: true }
        );

        if (response.status === 200 && response.data.message === "NGOs found") {
          setNgos(response.data.allNgos.reverse());
          console.log(response.data);
        }
      } catch (error) {
        if (
          error.response.status === 500 &&
          error.response.data.message ===
            "Internal server error while fetching Info of NGOs"
        ) {
          alert("internal server error");
        }
        if (
          error.response.status === 404 &&
          error.response.data.message === "No NGOs found"
        ) {
          alert("No Ngos found");
        }
        console.error("Error fetching NGOs:", error);
      }

      try {
        const token = localStorage.getItem("token");
        setAuthHeaders(token);
        const response = await axios.post(
          `${apiUrl}/templates/ngoBack`,
          { token },
          { withCredentials: true }
        );

        if (
          response.status === 200 &&
          response.data.message === "Successfully fetched NGO background"
        ) {
          setNgoback(response.data.ngo);
          console.log("data : ", response.data);
        }
      } catch (error) {
        if (
          error.response.status === 500 &&
          error.response.data.message ===
            "Internal server error while fetching Info of NGOs"
        ) {
          alert("internal server error");
        }
        if (
          error.response.status === 404 &&
          error.response.data.message === "No NGOs found"
        ) {
          alert("No Ngos found");
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
  function findMainByNgoId(targetNgoId) {
    if (targetNgoId == null) {
      return null;
    }
    for (const item of ngoback) {
      if (item.ngo_id.toString() === targetNgoId.toString()) {
        return item.main;
      }
    }
    // Return null if the ngo_id is not found
    return null;
  }
  return (
    <div className="home">
      <NavBar />
      <div className="popular">
        <div className="head">Popular NGOs</div>
        <div className="websites">
          {Array.isArray(ngos) &&
            ngos.map((ngo) => (
              <a
                href={`/ngo/${ngo.name}/${ngo._id}`}
                key={ngo._id}
                onClick={() => handleViewClick(ngo._id)}
                className="ngo-link"
              >
                <div className="ngo">
                  <Ngo
                    name={ngo.name}
                    creator={ngo.admin}
                    back={findMainByNgoId(ngo.ngo_id)}
                  />
                </div>
              </a>
            ))}
        </div>
      </div>
      <div className="build">
        <div className="markngo">
          <p>Want to mark your NGO ?</p>
        </div>
        <div className="buildbuttondiv">
          <Link to="/templateEdit">
            <button>Build your own NGO</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
