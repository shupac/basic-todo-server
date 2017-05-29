const express = require('express');
const jwt     = require('jsonwebtoken');
const router  = express.Router();

const User    = require('../models/user');
const secret  = require('../config').secret;

const User = require('../models/user');

router.post('/', (req, res) => {
  let { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    }
    else if (user) {
      if (user.password !== password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      }
      else {
        let token = jwt.sign(user, process.env.SECRET, { expiresIn: '24h' });
        res.status(200).json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});

router.options('/', (req, res) => {
  console.log('options header');
  res.status(200).send();
});

router.get('/setup', (req, res) => {
  let admin = new User({
    email: 'admin@example.com',
    password: 'pass',
    admin: true
  });

  admin.save((err) => {
    if (err) throw err;
    res.json({success: true})
  })
});

router.post('/signup', (req, res) => {
  let { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) throw err;
    if (user) {
      res.json({ success: false, message: 'Signup failed. User already exists.' });
    }
    else {
      let user = new User({ user, password });

      user.save((err) => {
        if (err) throw err;
        res.json({ success: true })
      });
    }
  });
});

module.exports = router;
