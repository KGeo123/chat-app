import { hash, compare } from 'bcrypt';
import User from '../models/user.js';
import { throwError } from '../lib/errors.js';
import { generateAccessToken, generateRefreshToken } from '../lib/tokens.js';

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

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throwError('email or password is invalid', 401);
    }
    const isPasswordEqual = await compare(password, user.password);
    if (!isPasswordEqual) {
      throwError('email or password is invalid', 401);
    }
    const newAccessToken = generateAccessToken({
      email,
      userId: user._id.toString()
    });
    const newRefreshToken = generateRefreshToken(user._id.toString());
    user.refreshToken = newRefreshToken;
    const updatedUser = await user.save();
    if (!updatedUser) {
      throwError();
    }
    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      path: '/refresh_token'
    });
    res
      .status(200)
      .json({ message: 'successfully logged in', accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};
