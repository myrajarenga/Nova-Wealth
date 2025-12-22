const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Ensure email is always saved in lowercase
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    // MFA Fields
    isMfaEnabled: {
      type: Boolean,
      default: false, // User must set this up after registration
    },
    mfaSecret: {
      type: String,
      default: null,
    },
    mfaEmailCode: {
      type: String,
      default: null,
    },
    mfaEmailExpires: {
      type: Date,
      default: null,
    },
    // Admin/Role fields (useful for later if you have admins vs clients)
    role: {
      type: String,
      enum: ['client', 'admin'],
      default: 'client',
    },
    resetCode: {
      type: String,
      default: null
    },
    resetExpires: {
      type: Date,
      default: null
    },
    onboardingStatus: {
      type: String,
      enum: ['new', 'active'],
      default: 'new',
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// --- Middleware: Encrypt password before saving ---
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    next();
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// --- Method: Match user entered password to hashed password in DB ---
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema)
module.exports = User
