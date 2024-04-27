//import React, { useState, useEffect } from "react";
import axios from "axios";

const fetchAPI = async (url, data, method, isTokenRequired = true) => {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    // Check if the token is required and available in localStorage
    if (isTokenRequired && localStorage.getItem('token')) {
      headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    }
  
    let options = {
      method: method,
      headers: headers,
      body: JSON.stringify(data),
    };
  
    if (method === 'GET') {
      options = {
        method: method,
        headers: headers,
      };
    }
    console.log("here0");
    return await axios.post(url,data,{ withCredintials: true, headers: headers} );
    // return fetch(url, options)
    //   .then((response) => {
    //     console.log(response);
    //     // if (!response.ok) {
    //     //   console.log("err");
    //     // //  throw new Error('Network response was not ok');
    //     // }
    //     return response.json();
    //   })
    //   .catch((error) => {
    //     console.error('There was a problem with the fetch operation:', error);
    //     throw error;
    //   });
  };
  

export default fetchAPI;
