const express = require('express');
const bodyParser = require('express').json;
const routes = require('./routes');

const app = express();

app.use(bodyParser());
app.use(routes);

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

module.exports = app;
