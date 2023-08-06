const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/fine', (req, res) => {
  controller.getFines((err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch fines' });
    } else {
      res.json({ results });
    }
  });
});

router.get('/fine/overdue', (req, res) => {
  controller.getFinesOverdue((err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch fines' });
    } else {
      res.json(results);
    }
  });
});

router.get('/fine/courthouse/:id', (req, res) => {
  controller.getFinesByCourthouse(req.params.id, (err, results) => {
    if (err) {
      if (err.message === 'No fines') {
        res.status(404).json({
          message: 'No fines for selected courthouse or courthouse not found',
        });
      } else {
        res.status(500).json({ error: 'Failed to fetch fines' });
      }
    } else {
      res.json(results);
    }
  });
});

router.get('/fine/subject/:id', (req, res) => {
  controller.getFinesBySubject(req.params.id, (err, results) => {
    if (err) {
      if (err.message === 'No fines') {
        res.status(404).json({
          message: 'No fines for selected courthouse or courthouse not found',
        });
      } else {
        res.status(500).json({ error: 'Failed to fetch fines' });
      }
    } else {
      res.json(results);
    }
  });
});

router.post('/fine', (req, res) => {
  const fine = req.body;
  controller.addFine(fine, (err, fineId) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add fine' });
    } else {
      res.json({ message: 'Successfully added fine', fineId });
    }
  });
});

router.get('/fine/:id', (req, res) => {
  controller.getFine(req.params.id, (err, fine) => {
    if (err) {
      if (err.message === 'Fine not found') {
        res.status(404).json({ message: 'Fine not found' });
      } else {
        res.status(500).json({ error: 'Failed to fetch fine' });
      }
    } else {
      res.json(fine);
    }
  });
});

router.delete('/fine/:id', (req, res) => {
  controller.deleteFine(req.params.id, err => {
    if (err) {
      if (err.message === 'Fine not found') {
        res.status(404).json({ message: 'Fine not found' });
      } else {
        res.status(500).json({ error: 'Failed to delete fine' });
      }
    } else {
      res.json({ message: 'Successfully deleted fine' });
    }
  });
});

router.put('/fine/:id', (req, res) => {
  const fine = req.body;
  controller.updateFine(fine, err => {
    if (err) {
      if (err.message === 'Fine not found') {
        res.status(404).json({ message: 'Fine not found' });
      } else {
        res.status(500).json({ error: 'Failed to update fine' });
      }
    } else {
      res.json({ message: 'Successfully updated fine', fine });
    }
  });
});

module.exports = router;
