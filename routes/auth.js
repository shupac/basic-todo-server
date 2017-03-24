const express = require('express');
const jwt     = require('jsonwebtoken');
const router  = express.Router();

const User    = require('../models/user');
const secret  = require('../config').secret;

router.post('/', (req, res) => {
  User.findOne({
    name: req.body.name
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.'});
    }
    else if (user) {
      if (user.password !== req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.'});
      }
      else {
        let token = jwt.sign(user, secret, { expiresIn: '24h' });
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

module.exports = router;
