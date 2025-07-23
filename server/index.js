const express = require('express');
//const { PrismaClient } = require('./generated/prisma/client');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const cors = require('cors');
require("dotenv").config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json
//const prisma = new PrismaClient();

console.log('DB_PASSWORD:', process.env.DB_PASS, 'Type:', typeof process.env.DB_PASSWORD);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT || 5432,
});

const user = {
  username: "",
  userid: '',
};
//initialize database
async function initializeDatabase() {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'db/schema.sql')).toString();
    await pool.query(sql);
    console.log('Database schema initialized');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
}

app.post('/login', async (req, res) => {
  const {username, password} = req.body;

  const attempt = await pool.query("Select password From users where username = $1", [username]);

  console.log(attempt);
});

app.post('/register', async (req, res) => {
  console.log("register route triggered");
  
  const { username, name, password, password_confirm, affiliation } = req.body;

  if (!name || !username || !password || !password_confirm) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (password !== password_confirm) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const hashedPassword = bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, name, password, affiliation) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, name, hashedPassword, affiliation]
    );

    //res.status(201).json(user);
    res.status(201).json({ 
      message: 'Registration successful', 
      redirect: '/Login',
      user: result.rows[0] 
    });

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
      'INSERT into WORKOUTS (title, content, user_id) VALUES ($1, $2, $3) RETURNING *', [title, str, 1]
    );

    res.status(200);
  } catch (err) {
    console.log("something went wrong", err);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Call this when your server starts
initializeDatabase();
//console.log("hi");
