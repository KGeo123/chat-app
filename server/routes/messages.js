import express from 'express';
import * as messagesController from '../controllers/messages.js';
import isAuth from '../middleware/isAuth';

const messagesRouter = express.Router();

messagesRouter.post('/new-message', messagesController.sendMessage);

export default messagesRouter;
