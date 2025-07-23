-- Drop tables if they exist (careful in production!)
DROP TABLE IF EXISTS workouts;
DROP TABLE IF EXISTS users;

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  affiliation VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Workouts table
CREATE TABLE workouts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Optional: Insert test data
INSERT INTO users (username, name, password, affiliation)
VALUES ('testuser', 'Test User', 'hashed_password', 'Test Affiliation');