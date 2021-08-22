import { hash, compare } from 'bcrypt';
import User from '../models/user.js';
import { throwError } from '../lib/errors.js';
import { generateAccessToken, generateRefreshToken } from '../lib/tokens.js';
import jwt from 'jsonwebtoken';

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
      userId: user._id.toString(),
      username: user.username
    });
    const newRefreshToken = generateRefreshToken(user._id.toString());
    user.refreshToken = newRefreshToken;
    const updatedUser = await user.save();
    if (!updatedUser) {
      throwError();
    }
    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      path: '/auth/refresh-token'
    });
    res
      .status(200)
      .json({ message: 'successfully logged in', accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  console.log(req.cookies);
  const refreshToken = req.cookies.refresh_token;
  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(payload.userId);
    if (!user) {
      throwError('You are not authorized', 401);
    }
    if (user.refreshToken !== refreshToken) {
      throwError('You are not authorized', 401);
    }
    const newRefreshToken = generateRefreshToken(user._id.toString());
    const newAccessToken = generateAccessToken({
      email: user.email,
      userId: user._id.toString(),
      username: user.username
    });
    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      path: '/auth/refresh-token'
    });
    user.refreshToken = newRefreshToken;
    const updatedUser = await user.save();
    console.log(updatedUser);
    if (!updatedUser) {
      throwError();
    }
    res.status(200).json({
      message: 'successfully generated new access token',
      accessToken: newAccessToken
    });
  } catch (error) {
    next(error);
  }
};
