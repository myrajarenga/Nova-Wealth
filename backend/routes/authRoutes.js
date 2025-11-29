const express = require('express');
const router = express.Router();
const { authUser, verifyMFA } = require('../controllers/authController');

router.post('/login', authUser);
router.post('/mfa/verify', verifyMFA);

module.exports = router;
