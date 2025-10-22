const express = require('express');
const app = express();

// Test each route one by one
console.log('Testing routes...');

try {
  app.get('/api/workouts/recent', (req, res) => res.send('ok'));
  console.log('✓ /api/workouts/recent');
} catch (e) {
  console.log('✗ /api/workouts/recent', e.message);
}

try {
  app.get('/api/workouts/search', (req, res) => res.send('ok'));
  console.log('✓ /api/workouts/search');
} catch (e) {
  console.log('✗ /api/workouts/search', e.message);
}

try {
  app.get('/api/workouts/:id', (req, res) => res.send('ok'));
  console.log('✓ /api/workouts/:id');
} catch (e) {
  console.log('✗ /api/workouts/:id', e.message);
}

try {
  app.get('*', (req, res) => res.send('ok'));
  console.log('✓ catch-all *');
} catch (e) {
  console.log('✗ catch-all *', e.message);
}

console.log('All routes tested');