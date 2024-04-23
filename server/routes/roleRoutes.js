const express = require('express');
const router = express.Router();
const { signUpForRole,fetchRole, deleteRole } = require('../controllers/RoleController');
const tokenMiddle = require("../middleware/tokenMiddle");

router.post('/signupRole',tokenMiddle, signUpForRole);
router.post('/fetchRole',tokenMiddle, fetchRole);
router.post('/deleteRole',tokenMiddle, deleteRole);

module.exports = router;