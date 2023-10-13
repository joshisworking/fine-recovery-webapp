const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/login', (req, res) => {
  const userLogin = req.body;

  controller.login(userLogin.username, userLogin.password, (err, userFound) => {
    if (err) {
      res.status(400).json({ error: 'Invalid username/password combination' });
    } else {
      res.json({ username: userFound[0].Username });
    }
  });
});

router.post('/register', (req, res) => {
  const newUser = req.body;

  controller.register(newUser.username, newUser.password, (err, userId) => {
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

module.exports = router;
