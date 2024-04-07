/*
	File contains routes dealing with users availablity on tasks.
*/
const express = require('express');
const router = new express.Router();

// Class contains fetching and adding methods of user available for tasks.
const UserTaskhandler = require("../controllers/UserTaskController");
const tokenMiddle = require("../middleware/tokenMiddle");

//Routes
router.post("/fetch_task", tokenMiddle, UserTaskhandler.FetchTaskusers); 
router.post("/add_task", tokenMiddle, UserTaskhandler.addTaskusers); 
router.post("/delete_task", tokenMiddle, UserTaskhandler.deleteTaskusers); 
module.exports = router