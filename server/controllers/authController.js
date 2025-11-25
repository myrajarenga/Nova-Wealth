const asyncHandler = require('express-async-handler')
const speakeasy = require('speakeasy')
const qrcode = require('qrcode')
const https = require('https')
const querystring = require('querystring')
const crypto = require('crypto')
const User = require('../models/User')
const generateToken = require('../utils/generateToken')
const nodemailer = require('nodemailer')

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  const normalizedEmail = String(email || '').toLowerCase().trim();

  const userExists = await User.findOne({ email: normalizedEmail });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email: normalizedEmail,
    password,
    phoneNumber,
  });

  if (user) {
    // --- CRM INTEGRATION HOOK ---
    // TODO: await sendLeadToCRM({ name, email, phone: phoneNumber });
    // ----------------------------

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isMfaEnabled: user.isMfaEnabled,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = String(email || '').toLowerCase().trim();

  const user = await User.findOne({ email: normalizedEmail });

  if (user && (await user.matchPassword(password))) {
    if (user.isMfaEnabled) {
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      user.mfaEmailCode = code
      user.mfaEmailExpires = new Date(Date.now() + 10 * 60 * 1000)
      await user.save()

      let sent = false
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
          const transporter = nodemailer.createTransport({
            host: 'mail.novawealth.co.ke',
            port: 465,
            secure: true,
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
          })
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Your Nova Wealth login code',
            text: `Your login verification code is ${code}. It expires in 10 minutes.`
          })
          sent = true
        } catch (e) {
          sent = false
        }
      }

      res.json({ _id: user._id, email: user.email, mfaRequired: true, devCode: sent ? undefined : code })
    } else {
      res.json({ _id: user._id, name: user.name, email: user.email, isMfaEnabled: user.isMfaEnabled, token: generateToken(user._id) })
    }
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Generate MFA email OTP
// @route   POST /api/auth/mfa/setup
// @access  Private (Requires Token from Register/Login)
const mfaSetup = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString()
  user.mfaEmailCode = code
  user.mfaEmailExpires = new Date(Date.now() + 10 * 60 * 1000)
  await user.save()

  let sent = false
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'mail.novawealth.co.ke',
        port: 465,
        secure: true,
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
      })
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Your Nova Wealth verification code',
        text: `Your verification code is ${code}. It expires in 10 minutes.`
      })
      sent = true
    } catch (e) {
      sent = false
    }
  }

  res.json({ message: 'Verification code sent', devCode: sent ? undefined : code })
});

// @desc    Verify MFA email OTP (Used for Setup confirmation AND Login)
// @route   POST /api/auth/mfa/verify
// @access  Public (Because during login, user might not have a JWT yet)
const mfaVerify = asyncHandler(async (req, res) => {
  const { email, token } = req.body
  const normalizedEmail = String(email || '').toLowerCase().trim()

  const user = await User.findOne({ email: normalizedEmail })

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  const now = new Date()
  const valid = user.mfaEmailCode && user.mfaEmailExpires && user.mfaEmailCode === token && user.mfaEmailExpires > now

  if (valid) {
    user.isMfaEnabled = true
    user.mfaEmailCode = null
    user.mfaEmailExpires = null
    await user.save()

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isMfaEnabled: true,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid or expired verification code')
  }
});

module.exports = { registerUser, loginUser, mfaSetup, mfaVerify }

// password reset: request code
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  const normalizedEmail = String(email || '').toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail })
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  user.resetCode = code
  user.resetExpires = new Date(Date.now() + 10 * 60 * 1000)
  await user.save()

  let sent = false
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'mail.novawealth.co.ke',
        port: 465,
        secure: true,
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
      })
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Nova Wealth reset code',
        text: `Your password reset code is ${code}. It expires in 10 minutes.`
      })
      sent = true
    } catch (e) {
      sent = false
    }
  }
  res.json({ message: 'If the email exists, a code has been sent.', devCode: sent ? undefined : code })
})

// password reset: verify code and set new password
const resetPassword = asyncHandler(async (req, res) => {
  const { email, code, newPassword } = req.body
  const normalizedEmail = String(email || '').toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail })
  if (!user || !user.resetCode || !user.resetExpires) {
    res.status(400)
    throw new Error('Invalid reset request')
  }
  if (user.resetCode !== code || user.resetExpires < new Date()) {
    res.status(400)
    throw new Error('Invalid or expired code')
  }
  user.password = newPassword
  user.resetCode = null
  user.resetExpires = null
  await user.save()
  res.json({ message: 'Password updated' })
})

module.exports.forgotPassword = forgotPassword
module.exports.resetPassword = resetPassword

// @desc    Return current user profile
// @route   GET /api/auth/me
// @access  Private
const me = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401)
    throw new Error('Not authorized')
  }
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    isMfaEnabled: req.user.isMfaEnabled
  })
})

module.exports.me = me

const googleAuth = asyncHandler(async (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const redirectUri = process.env.GOOGLE_REDIRECT_URI
  if (!clientId || !redirectUri) {
    res.status(500)
    throw new Error('Google OAuth not configured')
  }
  const scope = encodeURIComponent('openid email profile')
  const state = encodeURIComponent(String(req.query.state || ''))
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&access_type=offline&prompt=consent${state ? `&state=${state}` : ''}`
  res.redirect(authUrl)
})

function postToken(body) {
  return new Promise((resolve, reject) => {
    const data = querystring.stringify(body)
    const reqOptions = {
      method: 'POST',
      hostname: 'oauth2.googleapis.com',
      path: '/token',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(data) }
    }
    const req = https.request(reqOptions, (resp) => {
      let chunks = ''
      resp.on('data', (d) => (chunks += d))
      resp.on('end', () => {
        try {
          const json = JSON.parse(chunks)
          if (json.error) {
            reject(new Error(json.error_description || json.error))
          } else {
            resolve(json)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
    req.on('error', reject)
    req.write(data)
    req.end()
  })
}

function getGoogleUserInfo(accessToken) {
  return new Promise((resolve, reject) => {
    const reqOptions = {
      method: 'GET',
      hostname: 'www.googleapis.com',
      path: '/oauth2/v3/userinfo',
      headers: { Authorization: `Bearer ${accessToken}` }
    }
    const req = https.request(reqOptions, (resp) => {
      let chunks = ''
      resp.on('data', (d) => (chunks += d))
      resp.on('end', () => {
        try {
          const json = JSON.parse(chunks)
          resolve(json)
        } catch (e) {
          reject(e)
        }
      })
    })
    req.on('error', reject)
    req.end()
  })
}

const googleCallback = asyncHandler(async (req, res) => {
  const code = req.query.code
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const redirectUri = process.env.GOOGLE_REDIRECT_URI
  if (!code) {
    res.status(400)
    throw new Error('Missing authorization code')
  }
  if (!clientId || !clientSecret || !redirectUri) {
    res.status(500)
    throw new Error('Google OAuth not configured')
  }
  const tokens = await postToken({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code'
  })
  const userInfo = await getGoogleUserInfo(tokens.access_token)
  const normalizedEmail = String(userInfo.email || '').toLowerCase().trim()
  if (!normalizedEmail) {
    res.status(400)
    throw new Error('Unable to retrieve Google user email')
  }
  let user = await User.findOne({ email: normalizedEmail })
  if (!user) {
    const randomPassword = crypto.randomBytes(32).toString('hex')
    const safeName = String(userInfo.name || 'Google User')
    user = await User.create({
      name: safeName,
      email: normalizedEmail,
      password: randomPassword,
      phoneNumber: 'N/A'
    })
  }
  if (user.isMfaEnabled) {
    res.json({ _id: user._id, email: user.email, mfaRequired: true })
    return
  }
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isMfaEnabled: user.isMfaEnabled,
    token: generateToken(user._id)
  })
})

module.exports.googleAuth = googleAuth
module.exports.googleCallback = googleCallback
