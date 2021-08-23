import Socket from '../socket.js';
import Message from '../models/message.js';

export const sendMessage = async (req, res, next) => {
  const { message, username, userId } = req.body;
  const newMessage = new Message({ value: message, senderId: userId });
  const savedMessage = await newMessage.save();
  if (!savedMessage) {
    const error = new Error('could not send message');
    error.statusCode = 409;
    next(error);
  }
  console.log('sending message');
  Socket.getIo().on('connection', (socket) => {
    socket.broadcast.emit('message', {
      action: 'new-message',
      payoad: {
        value: message,
        user: username,
        messageId: savedMessage._id.toString()
      }
    });
  });
  res.status(200).json({ message: 'succesfully sent message' });
};
