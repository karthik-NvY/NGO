/*
	File contains routes dealing with users availablity on tasks.
*/
const express = require('express');
const router = new express.Router();

// Class contains fetching and adding methods of user available for tasks.
const UserTaskhandler = require("../controllers/UserTaskController");

//Routes
router.post("/fetch_task", UserTaskhandler.FetchTaskusers);  // /taskuser/fetch_task request
router.post("/add_task", UserTaskhandler.addTaskusers); 
router.post("/delete_task", UserTaskhandler.deleteTaskusers); 
module.exports = router