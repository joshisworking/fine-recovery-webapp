const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateToken } = require('../../../jwt/JWT');

router.get('/subject', validateToken, (req, res) => {
  const searchString = req.query.search;
  if (searchString) {
    controller.getSubjectByName('%' + searchString + '%', (err, subjects) => {
      if (err) {
        if (err.message === 'Subject not found') {
          res
            .status(404)
            .json({ message: 'Search string returned no results' });
        } else {
          res
            .status(400)
            .json({ message: 'Error: Search could not be completed' });
        }
      } else {
        res.json(subjects);
      }
    });
  } else {
    controller.getSubjects((err, subjects) => {
      if (err) {
        res.status(400).json({ message: 'Error: Failed to fetch subjects' });
      } else {
        res.json(subjects);
      }
    });
  }
});

router.get('/subject/:id', validateToken, (req, res) => {
  const id = req.params.id;
  controller.getSubject(id, (err, subject) => {
    if (err) {
      if (err.message === 'Subject not found') {
        res.status(404).json({ message: 'Error: Subject not found' });
      } else {
        res.status(400).json({ message: 'Error: Failed to fetch subject' });
      }
    } else {
      res.json(subject);
    }
  });
});

router.get('/subject/exists', validateToken, (req, res) => {
  const subject = req.body;

  controller.subjectExists(subject, (err, subjectExists) => {
    if (err) {
      res.status(500).json({ message: 'Error: Failed to check subjects' });
    } else {
      res.json({ subjectExists: true });
    }
  });
});

router.post('/subject', validateToken, (req, res) => {
  const subject = req.body;
  controller.addSubject(subject, (err, subjectId) => {
    if (err) {
      res.status(400).json({ message: 'Error: Failed to add subject' });
    } else {
      res.json({ message: 'Subject successfully added', subjectId });
    }
  });
});

router.put('/subject', validateToken, (req, res) => {
  const subject = req.body;
  controller.updateSubject(subject, err => {
    if (err) {
      if (err.message === 'Subject not found') {
        res.status(404).json({ message: 'Subject not found' });
      } else {
        res.status(400).json({ message: 'Error: Failed to update subject' });
      }
    } else {
      res.json({ message: 'Successfully updated subject', subject });
    }
  });
});

router.delete('/subject/:id', validateToken, (req, res) => {
  id = req.params.id;

  controller.deleteSubject(id, err => {
    if (err) {
      if (err.message === 'Subject not found') {
        res.status(404).json({ message: 'Error: Subject not found' });
      } else {
        res.status(400).json({ message: 'Error: Failed to delete subject' });
      }
    } else {
      res.json({ message: 'Subject successfully deleted' });
    }
  });
});

module.exports = router;
