const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/subject', (req, res) => {
  controller.getSubjects((err, subjects) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch subjects' });
    } else {
      res.json(subjects);
    }
  });
});

router.get('/subject/:id', (req, res) => {
  const id = req.params.id;
  controller.getSubject(id, (err, subject) => {
    if (err) {
      if (err.message === 'Subject not found') {
        res.status(404).json({ error: 'Subject not found' });
      } else {
        res.status(500).json({ error: 'Failed to fetch subject' });
      }
    } else {
      res.json(subject);
    }
  });
});

router.post('/subject', (req, res) => {
  const subject = req.body;
  controller.addSubject(subject, (err, subjectID) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add subject' });
    } else {
      res.json({ message: 'Subject successfully added', subjectID });
    }
  });
});

router.delete('/subject/:id', (req, res) => {
  id = req.params.id;

  controller.deleteSubject(id, err => {
    if (err) {
      if (err.message === 'Subject not found') {
        res.status(404).json({ error: 'Subject not found' });
      } else {
        res.status(500).json({ error: 'Failed to delete subject' });
      }
    } else {
      res.json({ message: 'Subject successfully deleted' });
    }
  });
});

module.exports = router;
