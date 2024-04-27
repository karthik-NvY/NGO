import React, { useState, useRef, useEffect } from 'react'
import "./Template1.css"

import axios from "axios";
import setAuthHeaders from "../../../Utils/setAuthHeaders";

const Template1 = () => {
    
    const apiUrl = process.env.REACT_APP_API_URL;
    const ngo_id = localStorage.getItem("ngo_id");
    useEffect(() => {
        fetchTemplateData(); // Fetch user profile data when component mounts
      }, []);
    
      const fetchTemplateData = async () => {
        try {
          const token = localStorage.getItem("token");
          setAuthHeaders(token);
          const response = await axios.post(`${apiUrl}/templates/fetchtemplate`, { token, ngo_id }, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
          console.log("response down here");
          console.log(response);
          
        } catch (error) {
          console.error("Error fetching Template data :", error);
        }
      };
  return (
    <div>
         <div>
            <h1>
              hi this is template 1
            </h1>
         </div>
    </div>
  )
}

export default Template1
