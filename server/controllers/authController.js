const asyncHandler = require('express-async-handler')
const speakeasy = require('speakeasy')
const qrcode = require('qrcode')
const User = require('../models/User')
const generateToken = require('../utils/generateToken')

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
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

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    
    // MFA CHECK
    if (user.isMfaEnabled) {
      // If MFA is on, do NOT send token yet. 
      // Send signal to frontend to show OTP screen.
      res.json({
        _id: user._id,
        email: user.email,
        mfaRequired: true, 
      });
    } else {
      // If MFA is OFF (e.g. first login), send token so they can proceed to Setup
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isMfaEnabled: user.isMfaEnabled, 
        token: generateToken(user._id),
      });
    }
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Generate MFA Secret and QR Code
// @route   POST /api/auth/mfa/setup
// @access  Private (Requires Token from Register/Login)
const mfaSetup = asyncHandler(async (req, res) => {
    // req.user comes from the authMiddleware
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // 1. Generate a temporary secret
    const secret = speakeasy.generateSecret({
        name: `Nova Wealth (${user.email})` // This name shows up in their Authenticator App
    });

    // 2. Save the secret to the user (but don't enable MFA yet until verified)
    user.mfaSecret = secret.base32;
    await user.save();

    // 3. Generate QR Code Image URL
    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
        if (err) {
            res.status(500);
            throw new Error('Error generating QR code');
        }

        // Send secret (for manual entry) and QR code (for scanning)
        res.json({
            secret: secret.base32,
            qrCode: data_url
        });
    });
});

// @desc    Verify MFA Token (Used for Setup confirmation AND Login)
// @route   POST /api/auth/mfa/verify
// @access  Public (Because during login, user might not have a JWT yet)
const mfaVerify = asyncHandler(async (req, res) => {
    const { email, token } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // 1. Verify the token using the stored secret
    const verified = speakeasy.totp.verify({
        secret: user.mfaSecret,
        encoding: 'base32',
        token: token,
        window: 1 // Allow 30sec slack (prevents time sync issues)
    });

    if (verified) {
        // 2. If verified, enable MFA status (idempotent - safe to call multiple times)
        user.isMfaEnabled = true;
        await user.save();

        // 3. Login Successful! Return the final JWT
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isMfaEnabled: true,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid MFA Code');
    }
});

module.exports = { registerUser, loginUser, mfaSetup, mfaVerify }