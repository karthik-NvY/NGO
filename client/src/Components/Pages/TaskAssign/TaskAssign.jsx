import React, { useState, useEffect } from "react";
import "./TaskAssign.css";
import NavBar from "../Dashboard/NavBar/NavBar";
import { FaCheck, FaTimes } from "react-icons/fa";

const TaskAssign = () => {
  // State to hold user list fetched from backend
  const [userlist, setUserlist] = useState([]);

  // Dummy user data
  const dummyUserList = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
    { id: 4, name: "User 4" },
    { id: 5, name: "User 5" },
  ];

  // Fetch user list from backend (For now, using dummy data)
  useEffect(() => {
    setUserlist(dummyUserList);
  }, []);

  // Function to handle selection of a user
  const handleUserSelect = (userId) => {
    // Filter out the selected user and update the user list state
    const updatedUserList = userlist.filter((user) => user.id !== userId);
    setUserlist(updatedUserList);
  };

  // Function to handle rejection of a user
  const handleUserReject = (userId) => {
    // Filter out the selected user and update the user list state
    const updatedUserList = userlist.filter((user) => user.id !== userId);
    setUserlist(updatedUserList);
  };

  return (
    <div className="taskAssignpage">
      <NavBar />

      <div className="taskassign">
        <h1>Task Assign</h1>

        <div className="userlist-heading">
          <h2>Users</h2>
          <div className="userlist">
            {/* Map through the userlist state to render each user */}
            {userlist.map((user) => (
              <div key={user.id} className="user-item">
                {/* <span>{user.id}</span> */}
                <span>{user.name}</span>
                <button
                  className="select-button"
                  onClick={() => handleUserSelect(user.id)}
                >
                  <FaCheck />
                </button>

                <button
                  className="cancel-button"
                  onClick={() => handleUserReject(user.id)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskAssign;
