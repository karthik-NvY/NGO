/*
	File contains routes dealing with api services.
*/
const express = require('express');
const router = new express.Router();

const Ngohandler  = require("../controllers/NgoController");
const NgoTaskhandler = require('../controllers/NgoTaskController');

router.post("/ngoInfo", Ngohandler.fetchNgoInfo); //Route /user/ngoinfopage
router.post("/ngoTask", NgoTaskhandler.FetchNgoTasks); // Route /user/ngo/ngotaskpage

module.exports = router