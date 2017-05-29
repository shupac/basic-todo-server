const express = require('express');
const jwt     = require('jsonwebtoken');
const router  = express.Router();

const User    = require('../models/user');

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
          message: 'User authenticated',
          token,
          user
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
  User.findOne({ email: 'admin@example.com' }, (err, user) => {
    if (err) throw err;
    if (!user) {
      let admin = new User({
        email: 'admin@example.com',
        password: 'pass',
        admin: true
      });

      admin.save((err) => {
        if (err) throw err;
        res.json({success: true})
      })
    }
    else res.json({ success: false, message: 'Admin already setup.' });
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
      let user = new User({ email, password, admin: false });

      user.save((err) => {
        if (err) throw err;
        let token = jwt.sign(user, process.env.SECRET, { expiresIn: '24h' });
        res.status(200).json({
          success: true,
          message: 'User authenticated',
          token,
          user: {
            email: user.email,
            admin: user.admin
          }
        });
      });
    }
  });
});

module.exports = router;
