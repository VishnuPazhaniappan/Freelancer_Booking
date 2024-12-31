// server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 5001;

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

app.use(cors());

// Get plumber data
app.get('/workers', (req, res) => {
  const { work } = req.query;
  let query = 'SELECT * FROM plumbers';
  if (work) {
    query += ` WHERE work = '${work}'`;
  }

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing SQL query: ', err);
      res.status(500).send('Error fetching plumbers');
      return;
    }
    res.json(results);
  });
});

// Other routes and middleware...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});