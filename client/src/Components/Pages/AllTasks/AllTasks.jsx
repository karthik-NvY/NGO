import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllTasks.css";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import NGONavbar from '../NgoView/NGONavbar/NGONavbar'

export const AllTasks = () => {
  let { userRole } = useParams();
  const [tasks, setTasks] = useState([]);
  //const [userRole, setUserRole] = useState(""); // State to store user role
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const ngo_id = localStorage.getItem("ngo_id");
        console.log(ngo_id);
        const response = await axios.post(
          `${apiUrl}/api/ngoTask`,
          { ngo_id },
          { withCredentials: true,headers: {'Authorization': `Bearer ${token}`} }
        );
        setTasks(response.data.Ngo_tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [apiUrl]);

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
    const ngo_id = localStorage.getItem('ngo_id'); // Retrieve ngo_id from local storage
    const token = localStorage.getItem("token");

    const response = await axios.post(`${apiUrl}/task/fetchInfo`, { token, ngo_id, id }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    console.log(response);
  }

  return (
    <div className="main">
      <NGONavbar name={localStorage.getItem("ngo_name")} logo={localStorage.getItem("ngo_logo")} id={localStorage.getItem("ngo_id")}/>
      <div className="tasks">
        <h2>NGO Tasks</h2>
        <div className="tasklist">
          {tasks && tasks.map((task) => 
            <div key={task._id} className="singletask" onClick={() => handleTask(task._id)}>
              {task.title}
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
        {/* Only show Select Task button if user role is "volunteer" */}
        {userRole === "volunteer" && (
          <button className="st" onClick={handleSelect}>
            Select Task
          </button>
        )}
      </div>
    </div>
  );
};

export default AllTasks;
