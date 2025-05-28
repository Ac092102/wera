const express = require('express');
const cors = require('cors');
const db = require('./db'); // This should correctly export the MySQL connection
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// POST route to submit quiz result
app.post('/submit', (req, res) => {
  const { name, student_id, score, total, gender } = req.body;

  // Basic validation
  if (!name || !student_id || score == null || total == null || !gender) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `
    INSERT INTO submissions (name, student_id, score, total, gender)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [name, student_id, score, total, gender], (err, result) => {
    if (err) {
      console.error('Database insert error:', err);
      return res.status(500).json({ error: 'Failed to save submission' });
    }

    res.json({ message: 'Submission saved successfully' });
  });
});

// GET route for admin to view results
app.get('/admin/results', (req, res) => {
  const query = `SELECT * FROM submissions ORDER BY submitted_at DESC`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Database select error:', err);
      return res.status(500).json({ error: 'Failed to fetch results' });
    }

    res.json(results);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

