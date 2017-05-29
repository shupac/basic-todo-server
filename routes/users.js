const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) throw err;
    res.status(200).json(users);
  });
});

module.exports = router;
