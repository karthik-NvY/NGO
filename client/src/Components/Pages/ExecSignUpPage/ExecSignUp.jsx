import React, { useState, useEffect } from "react";
import './ExecSignUp.css';
import NGONavbar from '../NgoView/NGONavbar/NGONavbar';
import axios from "axios";
import Userlist from "../Dashboard/userlist";

const ExecSignUp = () => {
   const apiUrl = process.env.REACT_APP_API_URL;
   const [fetchreq,setfetchreq]=useState(null);
   const [userdata,setuserdata]=useState(null);
   const ngo_id = localStorage.getItem("ngo_id");

   // useEffect(() => {
   //  const handlefetchRequest=async()=>{
   //      try{
   //          const token = localStorage.getItem("token");
   //          const ngo_id = localStorage.getItem("ngo_id");
   //          const res = await axios.post(
   //            `${apiUrl}/api/fetch`,
   //            { ngo_id },
   //            { withCredintials: true,headers: {'Authorization': `Bearer ${token}`} }
   //          );
   //          if(res.status === 200 ){
   //              setfetchreq(res.data.fetchrequests);
   //              return res.data.fetchrequests;
   //          }
   //          console.log(res);         
   //           }
   //        catch (error){
   //          console.error("Error fetching role:", error);
   //        }
   //  }

   //  const handleuserdata= async()=>{
   //      let u_data=[];
   //      try{
   //          const token = localStorage.getItem("token");

   //          const promises = fetchreq.map( async (fetch) =>{
   //          const user_id= fetch.user_id;
   //                  const res = await axios.post(
   //            `${apiUrl}/user/fetch_user`,
   //            { user_id },
   //            { withCredintials: true,headers: {'Authorization': `Bearer ${token}`} }
   //          );
   //          console.log(res);
   //          return res.data.data.name;
   //        });
   //        const names = await Promise.all(promises);
   //        setuserdata(names);
   //          }
   //        catch (error){
   //          console.error("Error fetching role:", error);
   //        }
   //  }


   //  const fetchreqs = handlefetchRequest();
   //  fetchreqs.then(()=>{
   //      setfetchreq(fetchreqs);
   //      console.log("fwf", fetchreq)
            
   //      handleuserdata();
   //      console.log(".......................................");
   //      console.log(userdata);
   //  })    
    
   // },[]);


   useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const ngo_id = localStorage.getItem("ngo_id");
            const res = await axios.post(
                `${apiUrl}/api/fetch`,
                { ngo_id },
                { withCredentials: true, headers: {'Authorization': `Bearer ${token}`} }
            );
            if (res.status === 200) {
                setfetchreq(res.data.fetchrequests);
                return res.data.fetchrequests;
            }
            console.log(res);         
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error; // Rethrow the error to indicate failure
        }
    };

    const fetchDataAndHandleUserData = async () => {
        try {
            const fetchedRequests = await fetchData();
            // Now that fetch requests are available, handle user data
            let u_data = [];
            const token = localStorage.getItem("token");
            const promises = fetchedRequests.map(async (fetch) => {
                const user_id = fetch.user_id;
                const res = await axios.post(
                    `${apiUrl}/user/fetch_user`,
                    { user_id },
                    { withCredentials: true, headers: {'Authorization': `Bearer ${token}`} }
                );
                console.log(res);
                return res.data.data;
            });
            const names = await Promise.all(promises);
            setuserdata(names);
            console.log(".......................................");
            console.log(userdata);
        } catch (error) {
            console.error("Error handling user data:", error);
        }
    };

    fetchDataAndHandleUserData(); // Start fetching data and handling user data
},[]);


    const handleAccept = async (user_id)=>{
        const token = localStorage.getItem("token");
        const ngo_id = localStorage.getItem("ngo_id");
        const res = await axios.post(
            `${apiUrl}/api/updateRole`,
            { ngo_id , user_id },
            { withCredentials: true, headers: {'Authorization': `Bearer ${token}`} }
        );
        if(res.status==200 && res.data.message=="role updated successfully"){
            console.log("fjwoifwh")
            const res2 = await axios.post(
                `${apiUrl}/api/admindelete`,
                { ngo_id , user_id },
                { withCredentials: true, headers: {'Authorization': `Bearer ${token}`} }
            );
            if(res.status==200 && res.data.message=="Request deleted successfully"){
                alert("Accepted user as executive");
                const tmp = {...userdata};
                setuserdata(Object.values(tmp).filter(item => item._id !== user_id))
            }
        };
    }

    const handleReject = async(user_id)=>{
        const token = localStorage.getItem("token");
        const ngo_id = localStorage.getItem("ngo_id");
        const res = await axios.post(
            `${apiUrl}/api/admindelete`,
            { ngo_id , user_id },
            { withCredentials: true, headers: {'Authorization': `Bearer ${token}`} }
        );
        if(res.status==200 && res.data.message=="Request deleted successfully"){
            alert("User rejected");
            const tmp = {...userdata};
            setuserdata(Object.values(tmp).filter(item => item._id !== user_id))
        }
    }

  return (
    <div className='main1'>
      <NGONavbar name={localStorage.getItem('ngo_name')} logo={localStorage.getItem('ngo_logo')} id={localStorage.getItem('ngo_id')} />
      <div className='centered-content'>
        <h1 className='table_head'>Request To become Executives</h1>
      </div>
      <div className='box'>
        <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userdata && userdata.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>
                <button onClick={()=>handleAccept(user._id)}>Accept</button>
                <button onClick={()=>handleReject(user._id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    </div>
  );
};

export default ExecSignUp;

