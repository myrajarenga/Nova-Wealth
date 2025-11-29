const asyncHandler = require('express-async-handler');
const User = require('../models/User');
// const generateToken = require('../utils/generateToken'); // Assuming this exists or can be added

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // Check if MFA is enabled
    if (user.mfaEnabled) {
      // Generate and send OTP logic here
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.mfaCode = otp;
      user.mfaCodeExpires = Date.now() + 10 * 60 * 1000; // 10 mins
      await user.save();
      
      // Send OTP via email or SMS (Mocking here)
      console.log(`MFA Code for ${email}: ${otp}`);

      res.json({
        mfaRequired: true,
        message: 'MFA code sent'
      });
    } else {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        // token: generateToken(user._id),
        token: "mock_jwt_token_123"
      });
    }
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Verify OTP
// @route   POST /api/auth/mfa/verify
// @access  Public
const verifyMFA = asyncHandler(async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });

  if (user && user.mfaCode === code && user.mfaCodeExpires > Date.now()) {
    user.mfaCode = undefined;
    user.mfaCodeExpires = undefined;
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      // token: generateToken(user._id),
      token: "mock_jwt_token_123"
    });
  } else {
    res.status(401);
    throw new Error('Invalid or expired OTP');
  }
});

module.exports = { authUser, verifyMFA };
