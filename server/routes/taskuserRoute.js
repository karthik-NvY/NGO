/*
	File contains routes dealing with users availablity on tasks.
*/
const express = require('express');
const router = new express.Router();

// Class contains fetching and adding methods of user available for tasks.
const taskuser = require("../controllers/UserTaskController");

//Routes
router.post("/task_requests", taskuser.FetchTaskusers); 
router.post("/request_task", taskuser.addTaskusers); 

module.exports = router