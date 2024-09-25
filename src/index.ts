import express, { Request, Response } from 'express';
import user from './routes/user';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
console.log(process.env.DB_USER, process.env.DB_PASSWORD);

app.use("", user);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});