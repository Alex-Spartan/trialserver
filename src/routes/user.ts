import { Request, Response, Router } from "express";
import mysql from "mysql2";
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: 'user'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

router.get('/', (req: Request, res: Response) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching users');
      return;
    }
    console.log(results);
    res.send("Hello");
  });
});

export default router;