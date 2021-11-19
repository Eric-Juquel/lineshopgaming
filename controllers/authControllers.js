import User from '../models/user';

// @desc   Register a new user
// @route  POST /api/auth/register
// @acces  Public
export const registerUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exits');
  }

  const user = await User.create({
    firstname,
    lastname,
    email,
    password,
    avatar: { public_id: 'PUBLIC_ID', url: 'URL' },
  });

  res.status(201).json({
    success: true,
    message: 'Account Register successfully',
  });
};
