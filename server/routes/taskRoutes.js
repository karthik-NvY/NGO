/*
	File contains routes dealing with api services.
*/
const express = require('express');
const router = new express.Router();


const TaskInfohandler= require("../controllers/TaskInfoController");

router.post("/fetchInfo", TaskInfohandler.fetchTaskInfo); //Route /task/fetchinfo
router.post("/storeInfo", TaskInfohandler.storeTaskinfo); //Route /task/storeinfo
router.post("/deleteInfo", TaskInfohandler.deleteTaskInfo); //Route /task/deleteinfo
router.post("/updateInfo", TaskInfohandler.updateTaskInfo);//Route /task/updateinfo

module.exports = router;