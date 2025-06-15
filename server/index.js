const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/workouts", (req, res) => {
  // Fetch workouts from DB
});
