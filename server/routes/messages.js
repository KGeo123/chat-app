import express from 'express';
import * as messagesController from '../controllers/messages.js';
import isAuth from '../middleware/isAuth.js';
import validateSchema from '../middleware/validateSchema.js';
import messageSchema from '../dto/message.js';

const messagesRouter = express.Router();

messagesRouter.get('/all-messages', isAuth, messagesController.getAllMessages);

export default messagesRouter;
