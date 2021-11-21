import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto'

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter your firstname'],
      minLength: [2, 'Tour firstname must have 2 characters at least'],
      maxLength: [50, 'Your firstname canot exceed  characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Please enter your lastname'],
      minLength: [2, 'Tour lastname must have 2 characters at least'],
      maxLength: [50, 'Your lastname canot exceed  characters'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      validate: [validator.isEmail, 'Please enter valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minLength: [6, 'Your password must be longer than 6 characters '],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    role: {
      type: String,
      default: 'user',
      enum: {
        values: ['user', 'admin'],
      },
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
