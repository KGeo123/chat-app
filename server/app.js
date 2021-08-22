import express from 'express';
import cors from 'cors';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.0.1:3000'
  })
);

app.use(express.json());
