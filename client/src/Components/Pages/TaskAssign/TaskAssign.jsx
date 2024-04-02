import React, { useState, useEffect } from "react";
import "./TaskAssign.css";
import NavBar from "../Dashboard/NavBar/NavBar"; // Optional NavBar component
import { FaCheck, FaTimes } from "react-icons/fa";

//const port_address = "http://localhost:8080";

const ngo_id = "65da11a82216111bff5d0bc0";

const TaskAssign = () => {
  // State to hold task list fetched from backend
  const [taskList, setTaskList] = useState([]);

  // Dummy task data with users
  const dummyTaskList = [
    {
      task: "Task 1",
      users: [
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
      ],
    },
    {
      task: "Task A",
      users: [
        { id: 1, name: "User 1" },
        { id: 4, name: "User 4" },
      ],
    },
    { task: "Complete Report", users: [{ id: 5, name: "User 5" }] },
    { task: "", users: [{ id: 6, name: "User 6" }] },
    {
      task: "Meeting at 10 AM",
      users: [
        { id: 7, name: "User 7" },
        { id: 8, name: "User 8" },
      ],
    },
  ];

 // Fetch task list from backend (For now, using dummy data)
  useEffect(() => {
    setTaskList(dummyTaskList);
  }, []);

  // useEffect(() => {
  //   // Fetch task list from backend for specific NGO
  //   const fetchTaskList = async () => {
  //     try {
  //       const response = await fetch(`/api/ngoTask?ngo_id=${ngo_id}`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch task list");
  //       }
  //       console.log("Response", response);
  //       const data = await response.json(); // Access response body once
  //      // console.log("Data", data);
  //       setTaskList(data);
  //     } catch (error) {
  //       console.log("Error fetching task list:", error);
  //     }
  //   };
    
  //   fetchTaskList(); // Call the fetchTaskList function
  // }, []); // Empty dependency array
  
  
  //console.log("TaskList");
 // console.log(taskList);
  // Function to handle selection of a user for a task
  const handleUserSelect = (taskId, userId) => {
    // Find the task in the task list
    const updatedTaskList = taskList.map((task) => {
      if (task.task === taskId) {
        // Filter out the selected user from the users array for the task
        const updatedUsers = task.users.filter((user) => user.id !== userId);
        return { ...task, users: updatedUsers };
      }
      return task;
    });
    setTaskList(updatedTaskList);
  };

  const handleUserReject = (taskId, userId) => {
    // Find the task in the task list
    const updatedTaskList = taskList.map((task) => {
      if (task.task === taskId) {
        // Filter out the selected user from the users array for the task
        const updatedUsers = task.users.filter((user) => user.id !== userId);
        return { ...task, users: updatedUsers };
      }
      return task;
    });
    setTaskList(updatedTaskList);
  };

  return (
    <div className="taskAssignpage">
      {/* Optional: Add NavBar component here */}
      <NavBar />

      <div className="taskassign-container">
        <h1>Task Assign</h1>

        <div className="tasklist-heading">
          <h2>Tasks</h2>
          <div className="tasklist">
            {/* Map through the taskList state to render each task */}
            {taskList.map((task) => (
              <div key={task.task} className="task-card">
                <h3>{task.task}</h3>
                <div className="user-list">
                  {/* Map through the users array for each task to render each user */}
                  {task.users.map((user) => (
                    <div key={user.id} className="user-card">
                      <span>{user.name}</span>
                      <div className="user-actions">
                        <button
                          className="select-button"
                          onClick={() => handleUserSelect(task.task, user.id)}
                        >
                          <FaCheck style={{ color: "green" }} />
                        </button>
                        <button
                          className="cancel-button"
                          onClick={() => handleUserReject(task.task, user.id)}
                        >
                          <FaTimes style={{ color: "red" }} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskAssign;
