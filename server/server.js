const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken')
const authRoutes = require('./routes/auth')
require('dotenv').config();

const app = express();
const dataFilePath = path.join(__dirname, 'data.json');
const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes)


app.post('/register', (req, res) =>{
  const data = req.body;
  console.log(data)

  res.json({ message: 'Data updated successfully' });
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
