const mongoose = require('mongoose');

const assessmentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  answers: {
    type: Object, // Stores question ID -> answer mapping
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  persona: {
    type: String,
    required: true,
    enum: ['Starter', 'Planner', 'Builder', 'Wealth Accelerator']
  },
  recommendations: {
    type: [String],
    required: false
  }
}, {
  timestamps: true
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;
