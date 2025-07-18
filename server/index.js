const express = require('express');
//const { PrismaClient } = require('./generated/prisma/client');
const { Pool } = require('pg');

const cors = require('cors');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const app = express();
//const prisma = new PrismaClient();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT || 5432,
});



app.use(cors());
app.use(express.json()); // for parsing application/json

app.post('/register', async (req, res) => {
  console.log("register route triggered");
  
  const { username, name, password, password_confirm, affiliation } = req.body;

  if (!name || !username || !password || !password_confirm) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    /*
    const user = await prisma.user.create({
      data: { username, name, password, affiliation},
    });
    */
    const hashedPassword = bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, name, password, affiliation) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, name, hashedPassword, affiliation]
    );


    res.status(201).json(user);
    console.log(`${username} added succesfully`);
  } catch (err) {
    if (err.code === 'P2002') {
      res.status(409).json({ error: 'Email already exists' });
    } else {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.post('/createWorkout', async (req,res) => {
  console.log("Create workout route triggered");

  const {title, sets} = req.body;
  console.log(title);
  console.log(sets);

  const fakeUserID = "mitch";

  try {
    console.log(JSON.stringify(sets));
    const str = JSON.stringify(sets);

    /*
    const workout = await prisma.workout.create({
      data: {title: title, content: str, userId: 1},
    });
    */

    const work = await pool.query(
      'INSERT into WORKOUTS (title, content, userID) VALUES ($1, $2, $3) RETURNING *', [title, str, 1]
    );

    res.status(200);
  } catch (err) {
    console.log("something went wrong", err);
  }
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time');
    res.json({ success: true, time: result.rows[0].current_time });
  } catch (err) {
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
