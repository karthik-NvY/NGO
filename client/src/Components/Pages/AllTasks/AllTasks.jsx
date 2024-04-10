import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllTasks.css";
import { useNavigate } from "react-router-dom";

export const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const ngo_id = localStorage.getItem("ngo_id");
        const response = await axios.post(
          `${apiUrl}/api/ngoTask`,
          { token, ngo_id },
          { withCredentials: true }
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

  return (
    <div className="main">
      <div className="tasks">
        <h2>NGO Tasks</h2>
        <ul>
          {tasks && tasks.map((task) => <li key={task._id}>{task.title}</li>)}
        </ul>
        <button className="st">Select Task</button>
        <button className="ct" onClick={handleCreate}>
          Create Task
        </button>
      </div>
    </div>
  );
};

export default AllTasks;
