import express, { Request, Response } from 'express';
import users from './routes/users';

const app = express();
const port = 3000;


app.use(express.json());


app.use("/", users);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});