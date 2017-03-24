const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

router.get('/', (req, res) => {
  Todo.find({}, (err, todos)=> {
      if(err) {
        console.error('Error loading todos', err);
        res.status(500).json({ Error: 'Error loading todos' });
      }
      else res.status(200).json(todos);
  });
});

router.post('/', (req, res) => {
  let title = req.body.title;
  Todo.create({title}, (err, todo) => {
    if (err) {
      console.error('Error creating todo', err);
      res.status(500).json({ Error: 'Error creating todo' });
    }
    else res.status(200).json(todo);
  });
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;

  Todo.findByIdAndRemove(id, (err, todo) => {
    if (err) {
      console.error('Error deleting todo', err);
      res.status(500).json({ Error: 'Error deleting todo' });
    }
    else res.status(200).json(todo);
  });
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let todo = {
    title: req.body.title,
    complete: req.body.complete,
    updated_at: Date.now()
  };

  Todo.findByIdAndUpdate(id, todo, (err, todo) => {
    if (err) {
      console.error('Error updating todo', err);
      res.status(500).json({ Error: 'Error updating todo' });
    }
    else res.status(200).json(todo);
  });
});

module.exports = router;
