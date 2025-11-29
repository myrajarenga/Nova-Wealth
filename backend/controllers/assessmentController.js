const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Assessment = require('../models/Assessment');
const syncToZohoCRM = require('../utils/crmSync');

// @desc    Submit assessment & capture lead
// @route   POST /api/assessment
// @access  Public
const submitAssessment = asyncHandler(async (req, res) => {
  const { fullName, email, phone, answers, score, persona } = req.body;

  // 1. Check if user exists
  let user = await User.findOne({ email });

  if (!user) {
    // 2. Create new user if not exists (no password yet)
    user = await User.create({
      name: fullName,
      email,
      phone,
      assessmentCompleted: true
    });
  } else {
    // Update existing user info if provided
    user.phone = phone || user.phone;
    user.name = fullName || user.name;
    user.assessmentCompleted = true;
    await user.save();
  }

  // 3. Save Assessment Result
  const assessment = await Assessment.create({
    user: user._id,
    answers,
    score,
    persona
  });

  // Link assessment to user
  user.lastAssessmentId = assessment._id;
  await user.save();

  // 4. Trigger CRM Sync (Async)
  syncToZohoCRM(user, assessment);

  res.status(201).json({
    success: true,
    data: {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        assessmentCompleted: user.assessmentCompleted
      },
      result: {
        score: assessment.score,
        persona: assessment.persona
      }
    }
  });
});

module.exports = { submitAssessment };
