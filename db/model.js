const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  email: {type: String, require: true},
  username: {type: String, require: true},
  password: {type: String, required: true, minLength: 6},
  role: String,
  gif: {
    url: String,
    embed_url: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;