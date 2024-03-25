/*
	File contains routes dealing with OTP.
*/
const express = require('express');
const OTPhandler = require('../controllers/OTPcontroller');

const router = express.Router();

router.post('/get-otp', OTPhandler.sendOTP); // Route /otp/get-otp
router.post('/validate-otp', OTPhandler.validateOTP); // Route /otp/validate-otp

module.exports = router;