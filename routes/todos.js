var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

router.get('/', function(req, res) {
  Todo.find({}, function(err, todos){
      if(err) res.send(err);
      else res.json(todos);
  });
});

router.post('/create', function(req, res) {
  var title = req.body.title;
  Todo.create({title: title}, function(err, todo) {
    if (err) res.render('error', { error: 'Error creating your todo'});
    else res.json(todo);
  });
});

router.post('/delete/:id', function(req, res) {
  var id = req.params.id;

  Todo.findByIdAndRemove(id, function(err, todo) {
    if (err) res.render('error', { Error: 'Error deleting job' });
    else res.json(todo);
  });
});

router.post('/update/:id', function(req, res) {
  var id = req.params.id;
  var todo = {
    title: req.body.title,
    complete: req.body.complete,
    updated_at: Date.now()
  };

  Todo.findByIdAndUpdate(id, todo, function(err, todo) {
    console.log(todo);
    if (err) {
      console.log('Error updating todo', err);
      res.render('error', { Error: 'Error updating todo' });
    }
    else res.json(todo);
  });
});

module.exports = router;
