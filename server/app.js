import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import Socket from './socket.js';
import messagesRouter from './routes/messages.js';

const app = express();
dotenv.config();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/messages', messagesRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'no endpoint found' });
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.statusCode || 500).json({
    message: error.message || 'internal server error',
    ...(error.description ? { description: error.description } : null)
  });
});

try {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`server listening on port ${process.env.PORT || 5000}`);
  });
  Socket.connect(server);
} catch (error) {
  console.log(error);
}
