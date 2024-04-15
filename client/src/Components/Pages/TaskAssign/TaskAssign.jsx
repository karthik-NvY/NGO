import React, { useState, useEffect } from "react";
import "./TaskAssign.css";
import NavBar from "../Dashboard/NavBar/NavBar"; // Optional NavBar component
import { FaCheck, FaTimes } from "react-icons/fa";
import fetchAPI from "../../Tools/FetchAPI";

const port_address = `http://localhost:8080`;

const ngo_id1 = "65da11a82216111bff5d0bc0";
const task_id = "66026442e2b18cac8fdda359";

const TaskAssign = () => {
  // State to hold task list fetched from backend
  const [taskList, setTaskList] = useState([]);
  const [taskInfo, setTaskInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetchAPI(`${port_address}/api/ngoTask`, { ngo_id: ngo_id1 }, "POST", false);
      if (response.success) {
        setTaskList(response.Ngo_tasks);
      } else {
        console.log("Error from backend:", response.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTaskInfo = async (taskId) => {
      let response = await fetchAPI(`${port_address}/task/fetchInfo`, { id: taskId }, "POST", false);
      return response.success ? response.task : null;
    };

    const fetchDataForTasks = async () => {
      const tasksInfo = await Promise.all(taskList.map(fetchTaskInfo));
      setTaskInfo(tasksInfo.filter(task => task !== null));
    };

    fetchDataForTasks();
  }, [taskList]);

  useEffect(() => {
    const fetchUserDetails = async (userId) => {
      let response = await fetchAPI(`${port_address}/user/fetchInfo`, { id: userId }, "POST", false);
      return response.success ? response.user : null;
    };

    const fetchUsersForTasks = async () => {
      const usersInfo = await Promise.all(
        taskInfo.flatMap(task => task.users.map(user => user.id)).map(fetchUserDetails)
      );
      const updatedTaskInfo = taskInfo.map(task => ({
        ...task,
        users: task.users.map(user => ({
          ...user,
          details: usersInfo.find(userInfo => userInfo && userInfo.id === user.id)
        }))
      }));
      setTaskInfo(updatedTaskInfo);
    };

    fetchUsersForTasks();
  }, [taskInfo]);

  // Function to handle selection of a user for a task
  const handleUserSelect = async (taskId, userId) => {
    let response = await fetchAPI(`${port_address}/task/updateUsers`, { taskId, userId }, "POST", false);
    if (response.success) {
      const updatedTaskList = taskList.map((task) => {
        if (task.task === taskId) {
          const updatedUsers = task.users.filter((user) => user.id !== userId);
          // If no users remaining for the task, remove the task from the list
          if (updatedUsers.length === 0) return null;
          return { ...task, users: updatedUsers };
        }
        return task;
      }).filter(task => task !== null);
      setTaskList(updatedTaskList);
    } else {
      console.log("Error updating user:", response.message);
    }
  };

  const handleUserReject = async (taskId, userId) => {
    let response = await fetchAPI(`${port_address}/task/removeUser`, { taskId, userId }, "POST", false);
    if (response.success) {
      const updatedTaskList = taskList.map((task) => {
        if (task.task === taskId) {
          const updatedUsers = task.users.filter((user) => user.id !== userId);
          // If no users remaining for the task, remove the task from the list
          if (updatedUsers.length === 0) return null;
          return { ...task, users: updatedUsers };
        }
        return task;
      }).filter(task => task !== null);
      setTaskList(updatedTaskList);
    } else {
      console.log("Error removing user:", response.message);
    }
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
            {/* Check if taskList is defined before mapping */}
            {Array.isArray(taskInfo) && taskInfo.map((task) => (
              <div key={task._id} className="task-card">
                <h3>{task.title}</h3>
                <div className="user-list">
                  {/* Map through the users array for each task to render each user */}
                  {task.users.map((user) => (
                    <div key={user._id} className="user-card">
                      <span>{user.details ? user.details.name : "Loading..."}</span>
                      <div className="user-actions">
                        <button className="select-button" onClick={() => handleUserSelect(task._id, user._id)}>
                          <FaCheck style={{ color: "green" }} />
                        </button>
                        <button className="cancel-button" onClick={() => handleUserReject(task._id, user._id)}>
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
