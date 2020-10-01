const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const db = require('../db/index.js');
const users = require('./routes/users.js')
const gifs = require('./routes/gifs.js')

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/../dist')));

app.get('/', (req, res) => {
  res.status(200).send('Request was good');
})

app.use('/users', users);
app.use('/gifs', gifs);

const port = process.env.PORT || 3000;
var server = app.listen(port, () => {console.log(`Listening on port: ${port}`)});

module.exports = server;