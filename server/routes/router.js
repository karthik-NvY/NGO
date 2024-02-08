const express = require('express');
const router = new express.Router();
const {sendOTP_userSignup,userSignup} = require("./api/userSignup");

//Routes
router.post("/user/signup",sendOTP_userSignup);
router.post("/user/signup/OTPverification",sendOTP_userSignup);

module.exports = router