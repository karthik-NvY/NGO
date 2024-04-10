import React, { useState } from "react";
import axios from "axios";
import "./Taskpage.css";
import NavBar from "../Dashboard/NavBar/NavBar";

export const Taskpage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    date: "",
    no_volunteer: "",
    ngo_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { title, description, date, no_volunteer } = taskData;
      const ngo_id = localStorage.getItem("ngo_id");
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiUrl}/task/storeInfo`,
        { token, ngo_id, title, description, date, no_volunteer },
        { withCredentials: true }
      );
      console.log("Task created:", response.data);
      setTaskData({
        title: "",
        description: "",
        date: "",
        no_volunteer: "",
      });
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <div className="main">
      <div className="task-box">
        <form onSubmit={handleSubmit}>
          <div className="input-taking">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-taking">
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={taskData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-taking">
            <input
              type="date"
              placeholder="Date"
              name="date"
              value={taskData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-taking">
            <input
              type="text"
              placeholder="no_volunteer"
              name="no_volunteer"
              value={taskData.no_volunteer}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit" className="TaskButton">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
