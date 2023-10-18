require('dotenv').config();

const express = require('express');
const router = express.Router();
const controller = require('./controller');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { createToken } = require('../../../jwt/JWT');

router.post('/login', (req, res) => {
  const userLogin = req.body;

  controller.login(userLogin.username, (err, userFound) => {
    if (err || userFound.length !== 1) {
      res.status(400).json({ error: 'Invalid username/password combination' });
    } else {
      bcrypt.compare(
        userLogin.password,
        userFound[0].password,
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error logging in user' });
          } else if (result) {
            // JWT cookie set
            const token = createToken(userFound[0]);
            res.cookie('access-token', token, { maxAge: 30000 });

            // Successful login
            res.json({
              auth: true,
              token: token,
            });
          } else {
            res
              .status(400)
              .json({ error: 'Invalid username/password combination' });
          }
        }
      );
    }
  });
});

router.post('/register', (req, res) => {
  const newUser = req.body;

  bcrypt.hash(newUser.password, saltRounds, (hashErr, hash) => {
    if (hashErr) {
      res.status(400).json({ error: 'Could not register user' });
      return;
    }

    controller.register(newUser.username, hash, (err, userId) => {
      if (err) {
        if (err.code == 'ER_DUP_ENTRY') {
          res.status(400).json({
            error:
              'Username already exists. Please change username and try again.',
          });
        } else {
          res.status(400).json({ error: 'Could not register user' });
        }
      } else {
        res.json(userId);
      }
    });
  });
});

module.exports = router;
