/*
	File contains routes dealing with user authentication.
*/
const express = require('express');
const router = new express.Router();

// Class contains signup and login methods.
const userAuth  = require("../controllers/userAuthController");
const tokenMiddle = require("../middleware/tokenMiddle");

//Routes
router.post("/signup", userAuth.userSignup); // Route /user/signup
router.post("/login", userAuth.userLogin); // Route /user/login
router.post("/delete", tokenMiddle, userAuth.deleteUserData); // Route /user/signup
router.post("/update", tokenMiddle, userAuth.updateUserData); 
router.post("/profile", tokenMiddle, userAuth.fetchUserProfile); //Route /user/profile
//router.post("/profile", userAuth.fetchUserProfile); //Route /user/profile
router.post("/logout", tokenMiddle, userAuth.logOut); //Route /user/profile

module.exports = router;