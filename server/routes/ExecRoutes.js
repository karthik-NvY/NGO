/*
	File contains routes dealing with api services.
*/
const express = require('express');
const router = new express.Router();

const waitlisthandler = require('../controllers/ExecSignupController');
const tokenMiddle = require("../middleware/tokenMiddle");

router.post("/fetch", tokenMiddle, waitlisthandler.fetchRequests); //Route /task/store
router.post("/add", tokenMiddle, waitlisthandler.storeRequest); //Route /task/store
router.post("/delete", tokenMiddle, waitlisthandler.deleteRequest); //Route /task/delete
router.post("/updateRole", tokenMiddle, waitlisthandler.updateRole);//Route /task/updaterole

module.exports = router;