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
   const handleuserdata= async(users)=>{
    let u_data=[];
    try{console.log("user...")
        const token = localStorage.getItem("token");
        
        users.forEach(async(user) => {
            const user_id= user.user_id
           const res = await axios.post(
          `${apiUrl}/user/fetch_user`,
          { user_id },
          { withCredintials: true,headers: {'Authorization': `Bearer ${token}`} }
        );
        if(res.status === 200 ){
            u_data.push(res.data.data);
        }
        console.log(res);
        })
        
        setuserdata(u_data);
        console.log(u_data);
      }
      catch (error){
        console.error("Error fetching role:", error);
      }
      
}
   useEffect(() => {
    
    const handlefetchRequest=async()=>{
        try{
            const token = localStorage.getItem("token");
            const ngo_id = localStorage.getItem("ngo_id");
            const res = await axios.post(
              `${apiUrl}/api/fetch`,
              { ngo_id },
              { withCredintials: true,headers: {'Authorization': `Bearer ${token}`} }
            );
            if(res.status === 200 ){
                setfetchreq(res.data.fetchrequests);
            }
            console.log(res);
            
          handleuserdata(res.data.fetchrequests)
           // handleuserdata(fetchreq[0].user_id);
          }
          catch (error){
            console.error("Error fetching role:", error);
          }
    }

    
    handlefetchRequest() // Fetch user profile data when component mounts
  }, [ngo_id]);

    console.log(userdata);
    // for (let i=0; i<fetchreq.length ;i++){
    //     handleuserdata(fetchreq[i].user_id)
    // }
    // handleuserdata(fetchreq.user_id)

  return (
    <div className='main1'>
      <NGONavbar name={localStorage.getItem('ngo_name')} logo={localStorage.getItem('ngo_logo')} id={localStorage.getItem('ngo_id')} />
      <div className='centered-content'>
        <h1 className='table_head'>Request To become Executives</h1>
      </div>
      <div className='box'>
        {userdata!== null && (userdata.map((user) => (
          
           <div className="">
            <div><Userlist name={user.name}/></div>
           </div>
        )))}
        </div>
    </div>
  );
};

export default ExecSignUp;

