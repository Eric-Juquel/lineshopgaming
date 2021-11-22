import User from '../models/user';
import cloudinary from 'cloudinary';
import absoluteUrl from 'next-absolute-url';
import crypto from 'crypto'

import sendEmail from '../utils/sendEmail';
import ErrorHandler from '../utils/errorHandler';

// Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// @desc   Register a new user
// @route  POST /api/auth/register
// @acces  Public
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exits');
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  res.status(201).json({
    success: true,
    message: 'Account Register successfully',
  });
};

// @desc   Current user profile
// @route  GET/api/auth
// @acces  Private
export const currentUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
};

// @desc   Update user profile
// @route  PUT/api/auth/update
// @acces  Private
export const updateProfile = async (req, res) => {
  let user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
  }

  //Update avatar
  if (req.body.avatar !== '') {
    if (user.avatar.public_id) {
      const image_id = user.avatar.public_id;

      // Delete user previous image/avatar
      await cloudinary.v2.uploader.destroy(image_id);
    }

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'Lineshop/avatars',
      width: '150',
      crop: 'scale',
    });

    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  await user.save();

  res.status(200).json({
    success: true,
  });
};

// @desc   Forgot password
// @route  POST/api/password/forgot
// @acces  Public
export const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User not found with this email', 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //Get origin
  const { origin } = absoluteUrl(req);

  // Create reset password url
  const resetUrl = `${origin}/password/${resetToken}`;

  const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'LineShop Password Recovery',
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
};

// @desc   Reset password
// @route  PUT/api/password/reset/:token
// @acces  Public
export const resetPassword = async (req, res, next) => {
  //Hash URL token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.query.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        'Password reset token is invalid or has been expired',
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match', 400));
  }

  // Setup the new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password updated successfully',
  });
};
