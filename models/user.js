const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: String,
  password: String,
  admin: Boolean
});

module.exports = mongoose.model('User', userSchema);
