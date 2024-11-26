const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  }
  
router.post('/login', (req, res) =>{
    const data = req.body;
    console.log(data)

    if (data.username == "admin" && data.password == "1234" || data.username == "feri" && data.password == "12") {
    const token = generateToken({ id: 1, username: data.username });
    res.json({ token });
    }
    else{
    res.status(401).json({ error: 'Invalid credentials' });
    }
})


module.exports = router;