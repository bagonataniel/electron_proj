const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mysql = require('mysql2')
require('dotenv').config();
const verifyToken = require('../middlewares/verifyToken');
const SECRET_KEY = process.env.SECRET_KEY;

router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  });

module.exports = router;