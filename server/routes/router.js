// Routes goes in here..
const express = require('express');
const router = new express.Router();
const { userLogin } = require("./api/userlogin");

//Routes
router.post("/user/login",userLogin);

module.exports = router