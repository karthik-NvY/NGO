const express = require('express');
const router = new express.Router();
const { userSignup, sendOTP_userSignup } = require('./api/userSignup');

//Routes
router.post("/user/signup", userSignup);
router.post("/user/signup/authenticateOTP",sendOTP_userSignup);

module.exports = router;