/*
	File contains routes dealing with api services.
*/
const express = require('express');
const router = new express.Router();

const Ngohandler  = require("../controllers/NgoController");
const TaskInfohandler= require("../controllers/TaskInfoController")

router.post("/ngoInfo", Ngohandler.fetchNgoInfo); //Route /user/ngoinfopage
router.post("/fetchInfo", TaskInfohandler.fetchTaskInfo); //Route /user/taskinfo
router.post("/storeInfo", TaskInfohandler.storeTaskInfo); //Route /user/ngoinfopage
module.exports = router