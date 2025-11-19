const express = require('express')
const router = express.Router()
const { registerUser, loginUser, mfaSetup, mfaVerify, forgotPassword, resetPassword } = require('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/mfa/verify', mfaVerify)
router.post('/mfa/setup', protect, mfaSetup)
router.post('/password/forgot', forgotPassword)
router.post('/password/reset', resetPassword)

module.exports = router