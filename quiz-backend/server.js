const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/submit', (req, res) => {
  const { name, student_id, score, total, gender } = req.body;

  if (!name || !student_id || !gender || typeof score !== 'number' || typeof total !== 'number') {
    return res.status(400).json({ message: "Invalid data" });
  }

  const query = `INSERT INTO submissions (name, student_id, score, total, gender) VALUES (?, ?, ?, ?, ?)`;
  const values = [name, student_id, score, total, gender];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("❌ DB error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json({ message: "Submission saved successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


