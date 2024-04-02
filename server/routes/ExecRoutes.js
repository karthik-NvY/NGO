/*
	File contains routes dealing with api services.
*/
const express = require('express');
const router = new express.Router();

const waitlisthandler = require('../controllers/ExecSignupController');

router.post("/fetch", waitlisthandler.fetchRequests); //Route /task/store
router.post("/add", waitlisthandler.storeRequest); //Route /task/store
router.post("/delete", waitlisthandler.deleteRequest); //Route /task/delete
router.post("/updateRole", waitlisthandler.updateRole);//Route /task/updaterole

module.exports = router;