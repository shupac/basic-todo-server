var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

router.get('/', function(req, res) {
  Todo.find({}, function(err, todos){
      if(err) {
        console.error('Error loading todos', err);
        res.status(500).json({ Error: 'Error loading todos' });
      }
      else res.status(200).json(todos);
  });
});

router.post('/', function(req, res) {
  var title = req.body.title;
  Todo.create({title: title}, function(err, todo) {
    if (err) {
      console.error('Error creating todo', err);
      res.status(500).json({ Error: 'Error creating todo' });
    }
    else res.status(200).json(todo);
  });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;

  Todo.findByIdAndRemove(id, function(err, todo) {
    if (err) {
      console.error('Error deleting todo', err);
      res.status(500).json({ Error: 'Error deleting todo' });
    }
    else res.status(200).json(todo);
  });
});

router.put('/:id', function(req, res) {
  var id = req.params.id;
  var todo = {
    title: req.body.title,
    complete: req.body.complete,
    updated_at: Date.now()
  };

  Todo.findByIdAndUpdate(id, todo, function(err, todo) {
    if (err) {
      console.error('Error updating todo', err);
      res.status(500).json({ Error: 'Error updating todo' });
    }
    else res.status(200).json(todo);
  });
});

module.exports = router;
