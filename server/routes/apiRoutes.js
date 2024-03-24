/*
	File contains routes dealing with api services.
*/
const express = require('express');
const router = new express.Router();

const Ngohandler  = require("../controllers/NgoController");
const tokenMiddle = require("../middleware/tokenMiddle");
const taskAutomation = require("../utils/taskAutomation");


router.post("/ngoInfo", Ngohandler.fetchNgoInfo); //Route /api/ngoinfo
router.post("/ngoTask", Ngohandler.FetchNgoTasks); // Route /api/ngotask

router.post("/ngoInfo", tokenMiddle, Ngohandler.fetchNgoInfo); //Route /user/ngoinfopage
router.post("/taskauto", tokenMiddle, )

module.exports = router;