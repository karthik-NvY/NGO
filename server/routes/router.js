const express = require('express');
const router = new express.Router();

const { userLogin } = require("./api/userlogin");
const { userSignup, sendOTP_userSignup } = require('./api/userSignup');

//Routes
router.post("/user/signup", userSignup);
router.post("/user/signup/authenticateOTP",sendOTP_userSignup);
router.post("/user/login",userLogin);

module.exports = router