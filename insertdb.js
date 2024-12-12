const mysql = require('mysql');
const bcrypt = require('bcryptjs');

// Create MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',      // Change to your MySQL server
  user: 'root',           // Change to your MySQL username
  password: 'Riaz@1234',           // Change to your MySQL password
  database: 'ride_management' // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Password to be hashed
const password = 'testPassword';

// Hash the password
bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) throw err;

  // SQL query to insert user data into the users table
  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
  const values = ['testuser@example.com', hashedPassword];  // Email and the hashed password

  // Execute the query to insert the user
  db.query(query, values, (err, result) => {
    if (err) throw err;
    console.log('User added:', result);
  });
});
