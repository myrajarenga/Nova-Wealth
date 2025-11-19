const mongoose = require('mongoose')

const leadSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String }, // For "Contact Us" forms
    message: { type: String }, // For "Contact Us" forms
    source: { 
        type: String, 
        enum: ['contact_us', 'get_started', 'wealth_journey'],
        default: 'contact_us' 
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'converted'],
        default: 'new'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema)