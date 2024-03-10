/*
	File contains routes dealing with api services.
*/
const express = require('express');
const router = new express.Router();

const Ngohandler  = require("../controllers/NgoController");
const tokenMiddle = require("../middleware/tokenMiddle");

router.post("/ngoInfo", tokenMiddle, Ngohandler.fetchNgoInfo); //Route /user/ngoinfopage

module.exports = router;