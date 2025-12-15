const express = require('express')
const router = express.Router()
const { registerUser, loginUser, mfaSetup, mfaVerify, forgotPassword, resetPassword, me, googleAuth, googleCallback } = require('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', (req, res) => {
  res.json({ status: 'ok', scope: 'auth', message: 'Auth routes are available' })
})

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/mfa/verify', mfaVerify)
router.post('/mfa/setup', protect, mfaSetup)
router.post('/password/forgot', forgotPassword)
router.post('/password/reset', resetPassword)
router.get('/me', protect, me)
router.get('/google', googleAuth)
router.get('/google/callback', googleCallback)

module.exports = router
