import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllTasks.css";

export const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${apiUrl}/api/ngoTask`,
          { token },
          { withCredentials: true }
        );
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [apiUrl]);

  //   const handleCreateTask = () => {
  //     history.push("/createtask");
  //   };

  return (
    <div className="main">
      <div className="tasks">
        <h2>NGO Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>{task.taskName}</li>
          ))}
        </ul>
        <button className="st">Select Task</button>
        <button className="ct">Create Task</button>
      </div>
    </div>
  );
};

export default AllTasks;
