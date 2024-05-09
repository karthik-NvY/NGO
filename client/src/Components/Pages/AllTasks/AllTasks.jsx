import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllTasks.css";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import NGONavbar from '../NgoView/NGONavbar/NGONavbar'
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { PiPlusSquareFill } from "react-icons/pi";
import anime from 'animejs/lib/anime.es.js';

export const AllTasks = () => {
  let { userRole } = useParams();
  const [tasks, setTasks] = useState(null);
  const [clicked, setclicked] = useState(null);
  const [anims, setanims] = useState(null);
  const [taskinfo, settaskinfo] = useState(null);
  const [requests, setrequests] = useState(null);
  //const [userRole, setUserRole] = useState(""); // State to store user role
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const ngo_id = localStorage.getItem("ngo_id");
        const response = await axios.post(
          `${apiUrl}/api/ngoTask`,
          { ngo_id },
          { withCredentials: true,headers: {'Authorization': `Bearer ${token}`} }
        );
        setTasks(response.data.Ngo_tasks);
        const tmp = {}
        const anim = {}
        const infos = {}
        const tmp_requests = {}
        response.data.Ngo_tasks.forEach(item => {
          tmp[item._id] = false;
          anim[item._id] = anime({
            targets:document.getElementById(item._id),
            duration: 200,
            easing: 'easeOutCubic',
            boxShadow: '0 10px 10px rgba(0, 0, 0, 0.3)',
            backgroundColor: '#baafa6',
            height:['5%', '20%'],
            autoplay:false,
          });
          infos[item._id] = null;
          tmp_requests[item._id] = false;
        });
        setclicked(tmp);
        setanims(anim);
        settaskinfo(infos);
        setrequests(tmp_requests);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleCreate = () => {
    navigate("/Taskpage");
  };
  const handleAssign = () => {
    navigate("/TaskAssign");
  };
  const handleSelect = () => {
    navigate("/Description");
  };

  const handleTask = async (id) =>{
    anims[id].play()
    anims[id].finished.then(() => {
      anims[id].reverse();
    })
    const token = localStorage.getItem("token");
    if(!taskinfo[id]){
      const ngo_id = localStorage.getItem('ngo_id'); // Retrieve ngo_id from local storage

      const response = await axios.post(`${apiUrl}/task/fetchInfo`, { token, ngo_id, id }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },        
      });  
      
      const infotmp = {...taskinfo};
      infotmp[id] = response.data.taskinfo
      const date = new Date(infotmp[id].date);
      const newdate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
      });
      infotmp[id].date = newdate
      settaskinfo(infotmp);
    }
    if(!requests[id]){
      const response2 = await axios.post(`${apiUrl}/taskuser/user_requested`, { token, task_id:id }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },        
      });
      const req = {...requests};
      req[id] = response2.data.requested;
      setrequests(req);
    }
    const tmp = {...clicked};
    tmp[id] = !tmp[id];
    setclicked(tmp);
  }

  const handleTaskRequest = async (id) =>{
    const token = localStorage.getItem("token");
    const response = await axios.post(`${apiUrl}/taskuser/add_task`, { token, task_id:id }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },        
    });
    console.log(response);
    if(response.status==201 && response.data.message=="User availability successfully added"){
      console.log("fw")
      const req = {...requests};
      req[id] = true;
      setrequests(req);
      alert("Successfully Requested for task.")
    }
  };
  return (
    <div className="main">
      <NGONavbar name={localStorage.getItem("ngo_name")} logo={localStorage.getItem("ngo_logo")} id={localStorage.getItem("ngo_id")}/>
      <div className="tasks">
        <h2>NGO Tasks</h2>
        <div className="tasklist">
          {tasks && tasks.map((task) => 
            <div key={task._id} id={task._id} className="singletask" onClick={() => handleTask(task._id)}>
              <p className="tasktitle">{task.title}</p>
              {clicked[task._id] && 
                <>
                <div className="taskdesc">{taskinfo[task._id].description}</div>
                <div className="taskstats">
                  <div>Date: {taskinfo[task._id].date}</div>
                  <div>Volunteers: {taskinfo[task._id].no_volunteer}</div>
                  {userRole=="volunteer" && !requests[task._id] && <div className="taskrequest" onClick={() => handleTaskRequest(task._id)}>Request:<TbSquareRoundedPlusFilled style={{ width: '80%', height:'60%'}}/></div>}
                  {userRole=="volunteer" && requests[task._id] && <span className="taskrequest_dead"><s>Request:</s><PiPlusSquareFill style={{ width: '80%', height:'60%'}}/></span>}
                </div>
                </>              
              }
            </div>)}
        </div>
        
        {/* Only show Create Task button if user role is "executive" */}
        {userRole === "executive" || userRole === "admin" && (
          <button className="ct" onClick={handleCreate}>
            Create Task
          </button>
        )}
        {/* Only show Create Task button if user role is "executive" */}
        {userRole === "executive" || userRole === "admin" && (
          <button className="At" onClick={handleAssign}>
            Task Assignments
          </button>
        )}
        
      </div>
    </div>
  );
};

export default AllTasks;
