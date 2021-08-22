import { hash } from 'bcrypt';
import User from '../models/user.js';
import { throwError } from '../lib/errors.js';

export const signUp = async (req, res, next) => {
  const { email, password, username } = req.body;
  const hashedPassword = await hash(password, 16);
  const user = new User({ email, password: hashedPassword, username });
  try {
    const doesUserExistWithThisEmail = !!(await User.findOne({ email }));
    if (doesUserExistWithThisEmail) {
			throwError('the specified email is already in use', 409);
    }
		const savedUser = await user.save();
    if (!savedUser) {
			throwError('Could not save new user');
    }
    res.status(201).json({
      message: 'Successfully created user',
      user: { email: savedUser.email, username: savedUser.username }
    });
  } catch (error) {
    next(error);
  }
};
