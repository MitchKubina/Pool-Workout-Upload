const express = require('express');
const { PrismaClient } = require('./generated/prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json()); // for parsing application/json

// ✅ /register route
app.post('/register', async (req, res) => {
  console.log("register route triggered");
  
  const { username, name, password, password_confirm, affiliation } = req.body;

  if (!name || !username || !password || !password_confirm) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const user = await prisma.user.create({
      data: { username, name, password, affiliation},
    });
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

    const workout = await prisma.workout.create({
      data: {title: title, content: str, userId: 1},
    });
  } catch (err) {
    console.log("something went wrong", err);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
