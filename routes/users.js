var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if (err) throw err;
    res.status(200).json(users);
  });
});

router.get('/setup', function(req, res) {
  var shu = new User({
    name: 'Shu',
    password: 'pass',
    admin: true
  });

  shu.save(function(err) {
    if (err) throw err;
    res.json({success: true})
  })
});

module.exports = router;
