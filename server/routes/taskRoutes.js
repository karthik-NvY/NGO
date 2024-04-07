/*
	File contains routes dealing with api services.
*/
const express = require('express');
const router = new express.Router();


const TaskInfohandler= require("../controllers/TaskInfoController");
const tokenMiddle = require("../middleware/tokenMiddle");

router.post("/fetchInfo", tokenMiddle, TaskInfohandler.fetchTaskInfo); //Route /task/fetchinfo
router.post("/storeInfo", tokenMiddle, TaskInfohandler.storeTaskinfo); //Route /task/storeinfo
router.post("/deleteInfo", tokenMiddle, TaskInfohandler.deleteTaskInfo); //Route /task/deleteinfo
router.post("/updateInfo", tokenMiddle, TaskInfohandler.updateTaskInfo);//Route /task/updateinfo

module.exports = router;