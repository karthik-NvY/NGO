import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllTasks.css";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

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
        const response = await axios.post(
          `${apiUrl}/api/ngoTask`,
          { ngo_id },
          { withCredentials: true,headers: {'Authorization': `Bearer ${token}`} }
        );
        setTasks(response.data.Ngo_tasks);

        // Assuming user role is returned in the response
        //setUserRole(response.data.userRole);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [apiUrl]);

  const handleCreate = () => {
    navigate("/Taskpage");
  };

  const handleSelect = () => {
    // Handle selection logic, e.g., navigate to task selection page
  };

  return (
    <div className="main">
      <div className="tasks">
        <h2>NGO Tasks</h2>
        <ul>
          {tasks && tasks.map((task) => <li key={task._id}>{task.title}</li>)}
        </ul>
        {/* Only show Create Task button if user role is "executive" */}
        {userRole === "executive" && (
          <button className="ct" onClick={handleCreate}>
            Create Task
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
