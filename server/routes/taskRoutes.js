/*
	File contains routes dealing with api services.
*/
const express = require('express');
const router = new express.Router();


const TaskInfohandler= require("../controllers/TaskInfoController");

router.post("/fetchInfo", TaskInfohandler.fetchTaskInfo); //Route /user/taskinfo
router.post("/storeInfo", TaskInfohandler.storeTaskinfo); //Route /user/ngoinfopage
module.exports = router;