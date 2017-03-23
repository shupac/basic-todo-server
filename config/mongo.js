var mongoose = require('mongoose');
require('./models/todo');

mongoose.connect('mongodb://localhost/express-todo', function() {
    console.log('connected to database!')
});