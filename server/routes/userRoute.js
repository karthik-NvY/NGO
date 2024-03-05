/*
	File contains routes dealing with user authentication.
*/
const express = require('express');
const router = new express.Router();

// Class contains signup and login methods.
const userAuth  = require("../controllers/userAuthController");

//Routes
router.post("/signup", userAuth.userSignup); // Route /user/signup
router.post("/login", userAuth.userLogin); // Route /user/login
router.post("/profile", userAuth.fetchUserProfile); //Route /user/profile

module.exports = router