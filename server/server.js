const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken')
const authRoutes = require('./routes/auth')
const mysql = require('mysql')
require('dotenv').config();

const app = express();
const dataFilePath = path.join(__dirname, 'data.json');
const SECRET_KEY = process.env.SECRET_KEY;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "financial_manager"
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes)


app.post('/register', async (req, res) =>{
  const data = req.body;
  console.log(data)

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?);";
    var values = [data.first_name, data.last_name, data.username, data.password];

    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
      res.json({ message: 'Register successful' });
    });
  });
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
