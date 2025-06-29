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
      data: { name, username , password, affiliation, email: "test"},
    });
    res.status(201).json(user);
    console.log("User added succesfully");
  } catch (err) {
    if (err.code === 'P2002') {
      res.status(409).json({ error: 'Email already exists' });
    } else {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
