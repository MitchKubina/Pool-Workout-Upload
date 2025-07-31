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

//console.log('DB_PASSWORD:', process.env.DB_PASS, 'Type:', typeof process.env.DB_PASSWORD);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT || 5432,
});

const user_info = {
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

app.post('/Logout', async (req, res) => {
  user_info.userid = '';
  user_info.username = '';
  
  res.status(200).json({ 
    success: true,
    message: 'Logout successful',
    // Instruct client to remove token
    action: 'clear_token' 
  });
})

app.post('/login', async (req, res) => {
  const {username, password} = req.body;

  const attempt = await pool.query("Select * From users where username = $1", [username]);

  if (attempt.rows.length == 0) {
    console.log("No users found");
    return res.status(401).json({error: "User not found"});
  }

  let userInfo = attempt.rows[0];
  const passwordMatch = bcrypt.compare(password, userInfo.password)

  if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
      { userId: userInfo.id, username: userInfo.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
  
  res.json({ 
      message: 'Login successful',
      token,
      user: { id: userInfo.id, username: userInfo.username, name: userInfo.name },
      redirect: "/"
    });

  user_info.userid = userInfo.id;
  user_info.username = userInfo.username;

  console.log(attempt.rows[0]);
  return attempt;
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
    const hashedPassword = await bcrypt.hash(password, 10);
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

    //console.log(user_info.userid);


    const work = await pool.query(
      'INSERT into WORKOUTS (title, content, user_id) VALUES ($1, $2, $3) RETURNING *', [title, str, user_info.userid]
    );

    //console.log(work);

    res.status(200);
  } catch (err) {
    console.log("something went wrong", err);
  }
});

app.get('/api/workouts/recent', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        workouts.id, 
        workouts.title, 
        workouts.content,
        workouts.created_at,
        users.username as author
      FROM workouts
      JOIN users ON workouts.user_id = users.id
      ORDER BY workouts.created_at DESC
      LIMIT 5
    `);
    
    // Parse the JSON content and format the response
    const workouts = result.rows.map(workout => ({
      ...workout,
      content: JSON.parse(workout.content),
      created_at: new Date(workout.created_at).toLocaleDateString()
    }));
    
    res.json({ workouts });
  } catch (err) {
    console.error('Error fetching workouts:', err);
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

app.get('/api/workouts/search', async (req, res) => {
    try {
        const { title } = req.query;
        //console.log("Search Route triggered");
        //console.log(title);

        if (!title) {
            return res.status(400).json({ error: 'Search title is required' });
        }

        console.log("here");

        const result = await pool.query(
            `SELECT 
                workouts.id,
                workouts.title,
                workouts.created_at,
                users.username as author
             FROM workouts
             JOIN users ON workouts.user_id = users.id
             WHERE workouts.title ILIKE $1
             ORDER BY workouts.created_at DESC`,
            [`%${title}%`] // ILIKE for case-insensitive search
        );

        console.log("here?");

        res.json(result.rows);
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ error: 'Failed to search workouts' });
    }
});

app.get('/api/workouts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT 
        workouts.*,
        users.username as author
      FROM workouts
      JOIN users ON workouts.user_id = users.id
      WHERE workouts.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    const workout = {
      ...result.rows[0],
      content: JSON.parse(result.rows[0].content)
    };

    res.json(workout);
  } catch (err) {
    console.error('Error fetching workout:', err);
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Call this when your server starts
initializeDatabase();
//console.log("hi");
