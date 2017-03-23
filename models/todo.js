var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  title: String,
  complete: { type: Boolean, default: false },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', todoSchema);
