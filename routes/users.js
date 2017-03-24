const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) throw err;
    res.status(200).json(users);
  });
});

router.get('/setup', (req, res) => {
  let shu = new User({
    name: 'Shu',
    password: 'pass',
    admin: true
  });

  shu.save((err) => {
    if (err) throw err;
    res.json({success: true})
  })
});

module.exports = router;
