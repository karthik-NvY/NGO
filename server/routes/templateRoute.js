/*
  This file contains routes for template handling. 
*/

const express = require('express');
const { template1 } = require('../controllers/templateController');
const router = new express.Router();

router.post('/template1', template1);

module.exports = router;