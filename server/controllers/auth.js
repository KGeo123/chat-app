import { hash } from 'bcrypt';
import User from '../models/user.js';
import { throwError } from '../lib/errors.js';

export const signUp = async (req, res, next) => {
  const { email, password } = req.body;
  const hashedPassword = await hash(password, 16);
  const user = new User({ email, password: hashedPassword });
  try {
    const doesUserExistWithThisEmail = !!(await User.findOne({ email }));
    const savedUser = await user.save();
    if (!savedUser) {
      throwError('Could not save new user');
    }
    if (doesUserExistWithThisEmail) {
      throwError('the specified email is already in use', 409);
    }
    res.status(201).json({
      message: 'Successfully created user',
      user: { userId: savedUser._id.toString(), email: savedUser.email }
    });
  } catch (error) {
    next(error);
  }
};
