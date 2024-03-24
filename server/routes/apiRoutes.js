/*
	File contains routes dealing with api services.
*/
const express = require('express');
const router = new express.Router();

const Ngohandler  = require("../controllers/NgoController");
const tokenMiddle = require("../middleware/tokenMiddle");
const taskAutomationController = require("../controllers/taskAutomationController");


router.post("/ngoInfo", Ngohandler.fetchNgoInfo); //Route /api/ngoinfo
router.post("/ngoTask", Ngohandler.FetchNgoTasks); // Route /api/ngotask

router.post("/ngoInfo", tokenMiddle, Ngohandler.fetchNgoInfo); //Route /user/ngoinfopage
router.post("/taskauto", tokenMiddle, taskAutomationController); 

module.exports = router;