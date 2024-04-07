/*
  This file contains routes for template handling. 
*/

const express = require('express');
const { TemplateHandler } = require('../controllers/templateController');
const tokenMiddle = require("../middleware/tokenMiddle");

const router = new express.Router();

router.post('/storetemplate', tokenMiddle, TemplateHandler.storeTemplate);
router.get('/fetchtemplate', tokenMiddle, TemplateHandler.fetchTemplate);

module.exports = router;