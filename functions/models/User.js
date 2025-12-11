import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
      lowercase: true,
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
    isMfaEnabled: {
      type: Boolean,
      default: false,
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
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Check if model exists to prevent overwrite error in hot-reload
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
