const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).send('Request was good');
})

const port = process.env.PORT || 3000;
var server = app.listen(port, () => {console.log(`Listening on port: ${port}`)});

module.exports = server;