const asyncHandler = require('express-async-handler')
const Lead = require('../models/Lead')
const nodemailer = require('nodemailer')

// @desc    Create a new lead (Contact form or Get Started)
// @route   POST /api/leads
// @access  Public
const createLead = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message, source } = req.body;

  // 1. Save to MongoDB
  const lead = await Lead.create({
    name,
    email,
    phone,
    subject,
    message,
    source,
  });

  if (lead) {
    // 2. Send Email Notification to Info@novawealth
    // Note: For production, use environment variables for credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your host (Truehost) settings
      auth: {
        user: process.env.EMAIL_USER, // Add this to .env
        pass: process.env.EMAIL_PASS  // Add this to .env
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'info@novawealth.co.ke',
      subject: `New Website Lead: ${name} (${source})`,
      text: `
            You have a new submission from the Nova Wealth Website.
            
            Source: ${source}
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Subject: ${subject || 'N/A'}
            Message: ${message || 'N/A'}
            
            This lead has been saved to the database.
        `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      // We don't fail the request if email fails, but we log it.
    }

    // --- CRM HOOK ---
    // TODO: await sendLeadToCRM(lead);
    // ----------------

    res.status(201).json(lead);
  } else {
    res.status(400);
    throw new Error('Invalid lead data');
  }
});

module.exports = { createLead }