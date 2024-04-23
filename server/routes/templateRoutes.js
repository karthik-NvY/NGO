/*
  This file contains routes for template handling. 
*/

const express = require('express');
const { TemplateHandler } = require('../controllers/templateController');
const tokenMiddle = require("../middleware/tokenMiddle");

const multer = require('multer');

const router = new express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/storetemplate', tokenMiddle, TemplateHandler.storeTemplate);
router.post('/storetemplatetmp', tokenMiddle, upload.single('image'), TemplateHandler.storeTemplatetmp);
router.post('/fetchtemplate', tokenMiddle, TemplateHandler.fetchTemplate);

module.exports = router;