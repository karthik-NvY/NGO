/*
    this file contain routes for global availability status
*/ 

const express = require('express');
const tokenMiddle = require("../middleware/tokenMiddle");
const router = new express.Router();

const GlobalStatushandler = require('../controllers/GlobalStatusController');

router.post("/available", tokenMiddle, GlobalStatushandler.GlobalAvailable); //Route  /global/available
router.post("/notavailable", tokenMiddle, GlobalStatushandler.GlobalNotAvailable); //Route    /global/notavailable
router.post("/fetchglobals", tokenMiddle, GlobalStatushandler.GlobalFetch) //Route /global/globalfetch

module.exports = router;