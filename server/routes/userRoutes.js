const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mysql = require('mysql2')
require('dotenv').config();
const verifyToken = require('../middlewares/verifyToken');
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

router.post('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  });

router.post('/createAccount', verifyToken, (req, res) =>{
  const data = req.body
  
  pool.execute("INSERT INTO accounts (user_id, name, type, balance) VALUES (?,?,?,?)", [req.user.id, data.accountName, data.accountType, data.balance], function(err, result) {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({ message : "Account created successfully"})
})
});

router.get('/getAllAccounts', verifyToken, (req, res) =>{
  pool.execute("SELECT * FROM accounts WHERE user_id = (?)", [req.user.id], function(err, result) {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.length === 0) {
      return res.json({error : "No account were found"});
    }

    return res.json(result);
  })
})

router.post('/removeAccount', verifyToken, (req, res) =>{
  const data = req.body
  pool.execute("DELETE FROM accounts WHERE user_id = (?) and id = (?)", [req.user.id, data.accId], function(err,result) {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({ message : "Account deleted successfully"})
  })
})

router.post('/editAccount', verifyToken, (req, res) => {
  const data = req.body
  pool.execute("UPDATE accounts SET name = (?) WHERE user_id = (?) and id = (?)", [data.newName, req.user.id, data.AccountId], function(err, result) {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: 'Database error' });
    }
    else{
      res.json({ message : "Account renamed succesfully"})
    }

  })
})
module.exports = router;