/*
    this file contain routes for global availability status
*/ 

const express = require('express');
const router = new express.Router();

const GlobalStatushandler = require('../controllers/GlobalStatusController');

router.post("/available", GlobalStatushandler.GlobalAvailable); //Route  /global/available
router.post("/notavailable", GlobalStatushandler.GlobalNotAvailable); //Route    /global/notavailable

module.exports = router;