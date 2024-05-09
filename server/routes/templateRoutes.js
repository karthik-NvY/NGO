/*
  This file contains routes for template handling. 
*/

const express = require('express');
const { TemplateHandler } = require('../controllers/templateController');
const tokenMiddle = require("../middleware/tokenMiddle");

const router = new express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/storetemplate', tokenMiddle, upload.array('images'), TemplateHandler.storeTemplate);
router.post('/fetchtemplate', tokenMiddle, TemplateHandler.fetchTemplate);
router.post("/ngoBack", tokenMiddle, TemplateHandler.fetchNgoBack);

module.exports = router;