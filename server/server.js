const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken')
const authRoutes = require('./routes/auth')
const mysql = require('mysql2')
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


app.post('/register', async (req, res) =>{
  const data = req.body;
  console.log(data)

  pool.execute("INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?,?,?,?)", [data.first_name, data.last_name, data.username, data.password], function(err, result) {
    if (err) {
      console.error(err)
      if (err.code == "ER_DUP_ENTRY") {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    console.log("Register successful");
    
    res.json({ message: 'Register successful' });
  })
})


function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Unauthorized' });

      req.user = decoded; // Attach user info to the request
      next();
  });
}

// Example protected route
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
