const express = require('express');
const bodyParser = require('express').json;
const cors = require('cors');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(bodyParser());
app.use(routes);

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

module.exports = app;
