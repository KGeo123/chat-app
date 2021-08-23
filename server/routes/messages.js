import express from 'express';
import * as messagesController from '../controllers/messages.js';
import isAuth from '../middleware/isAuth.js';
import validateSchema from '../middleware/validateSchema.js';
import messageSchema from '../dto/message.js';

const messagesRouter = express.Router();

messagesRouter.post(
  '/new-message',
  isAuth,
  validateSchema(messageSchema),
  messagesController.sendMessage
);

export default messagesRouter;
