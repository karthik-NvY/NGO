const express = require('express');
const router = express.Router();
const { signUpForRole, deleteRole } = require('../controllers/RoleController');

router.post('/signupRole', signUpForRole);
router.post('/deleteRole', deleteRole);

module.exports = router;