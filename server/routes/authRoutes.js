const express = require('express')
const router = express.Router()
const { registerUser, loginUser, mfaSetup, mfaVerify } = require('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/mfa/verify', mfaVerify)
router.post('/mfa/setup', protect, mfaSetup)

module.exports = router