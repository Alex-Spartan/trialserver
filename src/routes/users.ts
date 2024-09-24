import { Router } from 'express';
import mysql from 'mysql2/promise';

const router = Router();


router.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'user',
    });

    // A simple SELECT query
    const [results, fields] = await connection.query(
      'SELECT * FROM users'
    );

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available

    await connection.end();
  } catch (err) {
    console.log(err);
  }
  res.send('Hello World!');
});

export default router;