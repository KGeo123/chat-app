import express from 'express';
import * as AuthController from '../controllers/auth.js';

const authRouter = express.Router();

authRouter.post('/signup', AuthController.signUp);

authRouter.post('/login', AuthController.login);

authRouter.get('/refresh-token', AuthController.refreshAccessToken);

export default authRouter;
