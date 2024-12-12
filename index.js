const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Riaz@1234',
  database: 'ride_management',


  
});

const JWT_SECRET = 'abcd'

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(400).json({ message: 'User not found' });

    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err });
      if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

      // Generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(403).json({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// Example of a protected route
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
