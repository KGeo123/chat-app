import Message from '../models/message.js';
import { throwError } from '../lib/errors.js';

export const getAllMessages = async (req, res, next) => {
  try {
    const allMessages = await Message.find();
    if (!allMessages) {
      throwError('could not fetch data');
    }
    res
      .status(200)
      .json({ message: 'fetched all data', messages: allMessages });
  } catch (error) {
    next(error);
  }
};
