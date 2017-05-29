const express = require('express');
const jwt     = require('jsonwebtoken');
const router  = express.Router();

const User    = require('../models/user');

router.use((req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['authorization'];
  if (token) {
    token = token.split('Bearer ')[1];
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.'});
      }
      else {
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

module.exports = router;
