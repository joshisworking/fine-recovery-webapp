const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateToken } = require('../../../jwt/JWT');

router.get('/courthouse', validateToken, (req, res) => {
  controller.getCourthouses((err, courthouses) => {
    if (err) {
      res.status(400).json({ error: 'Could not fetch courthouses' });
    } else {
      res.json(courthouses);
    }
  });
});

router.get('/courthouse/:id', validateToken, (req, res) => {
  const id = req.params.id;
  controller.getCourthouse(id, (err, courthouse) => {
    if (err) {
      if (err.message === 'Courthouse not found') {
        res.status(404).json({ error: 'Courthouse not found' });
      } else {
        res.status(400).json({ error: 'Could not fetch courhouses' });
      }
    } else {
      res.json(courthouse[0]);
    }
  });
});

router.post('/courthouse', validateToken, (req, res) => {
  const courthouse = req.body;
  controller.addCourthouse(courthouse, (err, courthouseId) => {
    if (err) {
      res.status(400).json({ error: 'Could not add courthouse' });
    } else {
      res.json({ message: 'Successfully added courthouse', courthouseId });
    }
  });
});

router.delete('/courthouse/:id', validateToken, (req, res) => {
  controller.deleteCourthouse(req.params.id, err => {
    if (err) {
      if (err.message === 'Courthouse not found') {
        res.status(404).json({ message: 'Courthouse not found' });
      } else {
        res.status(400).json({ error: 'Failed to delete courthouse' });
      }
    } else {
      res.json({ message: 'Successfully deleted courthouse' });
    }
  });
});

router.put('/courthouse', validateToken, (req, res) => {
  const courthouse = req.body;
  console.log(courthouse);
  controller.updateCourthouse(courthouse, err => {
    if (err) {
      if (err.message === 'Courthouse not found') {
        res.status(404).json({ message: 'Courthouse not found' });
      } else {
        res.status(400).json({ error: 'Failed to update courthouse' });
      }
    } else {
      res.json({ message: 'Successfully updated courthouse', courthouse });
    }
  });
});

module.exports = router;
