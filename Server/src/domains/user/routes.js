const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/users', (req, res) => {
  controller.getUsers((err, users) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    } else {
      res.json(users);
    }
  });
});

router.get('/users/:id', (req, res) => {
  userId = req.params.id;
  controller.getUser(userId, (err, user) => {
    if (err) {
      if (err.message === 'User not found') {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(500).json({ error: 'Failed to fetch user' });
    }

    res.json(user);
  });
});

router.post('/users', (req, res) => {
  const user = req.body;

  controller.addUser(user, (err, userId) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add user' });
    } else {
      res.json({ message: 'User added successfully', userId: userId });
    }
  });
});

router.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  controller.deleteUser(userId, err => {
    if (err) {
      if (err.message === 'User not found') {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(500).json({ error: 'Failed to delete user' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  });
});

module.exports = router;
