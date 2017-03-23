var express = require('express');
var jwt     = require('jsonwebtoken');
var router  = express.Router();

var User    = require('../models/user');
var secret  = require('../config').secret;

router.post('/', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.'});
    }
    else if (user) {
      if (user.password !== req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.'});
      }
      else {
        var token = jwt.sign(user, secret, { expiresIn: '24h' });
        res.status(200).json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});

module.exports = router;
