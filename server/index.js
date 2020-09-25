const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const db = require('../db/index.js');
const User = require('../db/model.js')
require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/../dist')));

app.get('/', (req, res) => {
  res.status(200).send('Request was good');
})

app.post('/users', (req, res) => {
  let data = req.body;
  if (!data.email || !data.username || !data.password || !data.confirmPassword) {
    res.status(400).send('Please fill all of the fields to register');
  } else {
    res.status(200).send(`User: \"${data.username}\" registered with email: \"${data.email}\"`);
  }
})

const port = process.env.PORT || 3000;
var server = app.listen(port, () => {console.log(`Listening on port: ${port}`)});

module.exports = server;