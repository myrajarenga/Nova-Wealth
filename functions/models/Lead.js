import mongoose from 'mongoose';

const leadSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String },
    message: { type: String },
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

const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
export default Lead;
