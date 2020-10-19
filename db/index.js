const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/giphyInterface', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to database successfully.');
});

module.exports = db;