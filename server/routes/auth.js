const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mysql = require('mysql2')
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

var pool = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,  // Number of connections in the pool
  queueLimit: 0
});

function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  }
  
router.post('/login', (req, res) =>{
    const data = req.body;
    console.log(data)

    pool.execute("SELECT * FROM users WHERE email = ?", [data.username], function(err, result) {
        if (err) {
          console.error(err)
          return res.status(500).json({ error: 'Database error' });
        }

        if (result.length === 0) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (data.password == result[0].password_hash) {
          const token = generateToken({ id: result[0].user_id, username: data.username });
          res.json({ token });
        }
        else{
          res.status(401).json({ error: 'Invalid credentials' });
        }
    })
})


module.exports = router;