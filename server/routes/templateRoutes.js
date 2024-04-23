/*
  This file contains routes for template handling. 
*/

const express = require('express');
const { TemplateHandler } = require('../controllers/templateController');
const tokenMiddle = require("../middleware/tokenMiddle");

const router = new express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/storetemplate', tokenMiddle, TemplateHandler.storeTemplate);
router.post('/storetemplatetmp', tokenMiddle,upload.array('images', 2), TemplateHandler.storeTemplatetmp);
router.post('/fetchtemplate', tokenMiddle, TemplateHandler.fetchTemplate);

module.exports = router;