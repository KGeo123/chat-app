import express from 'express';
import * as AuthController from '../controllers/auth.js';
import validateSchema from '../middleware/validateSchema.js';
import signUpSchema from '../dto/signUp.js';
import loginSchema from '../dto/login.js';
import isAuth from '../middleware/isAuth';

const authRouter = express.Router();

authRouter.post('/signup', validateSchema(signUpSchema), AuthController.signUp);

authRouter.post('/login', validateSchema(loginSchema), AuthController.login);

authRouter.get('/refresh-token', AuthController.refreshAccessToken);

authRouter.get('/logout', isAuth, AuthController.logout);

export default authRouter;
