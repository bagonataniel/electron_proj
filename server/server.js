const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/userRoutes')
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const dataFilePath = path.join(__dirname, 'data.json');
const SECRET_KEY = process.env.SECRET_KEY;

// SECRET_KEY = "b9a712fc7a6f3e509dc2ac789ac08ea8395767179b04502fbcb"
// HOST = "localhost"
// USER = "root"
// PASSWORD = ""
// DATABASE = "financial_manager"

var pool = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,  // Number of connections in the pool
  queueLimit: 0
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes)
app.use('/', userRoutes)


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
