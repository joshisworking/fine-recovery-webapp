const db = require('../../config/db');
const sql = require('./queries');

const getFines = callback => {
  db.query(sql.fines, (err, results) => {
    if (err) {
      console.log('Error executing query: ', err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getFine = (id, callback) => {
  db.query(sql.fineById, id, (err, results) => {
    if (err) {
      console.log('Error executing query: ', err);
      callback(err, null);
    } else {
      if (results.length === 0) {
        callback(new Error('Fine not found'), null);
      } else {
        callback(null, results[0]);
      }
    }
  });
};

const getFinesOverdue = callback => {
  db.query(sql.finesOverdue, (err, results) => {
    if (err) {
      console.log('Error executing query: ', err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getFinesByCourthouse = (courthouseId, callback) => {
  db.query(sql.finesBycourthouseId, courthouseId, (err, results) => {
    if (err) {
      console.log('Error executing query: ', err);
      callback(err, null);
    } else {
      if (results.length === 0) {
        callback(null, results);
      } else {
        callback(null, results);
      }
    }
  });
};

const getFinesBySubject = (subjectId, callback) => {
  db.query(sql.finesBysubjectId, subjectId, (err, results) => {
    if (err) {
      console.log('Error executing query: ', err);
      callback(err, null);
    } else {
      if (results.length === 0) {
        callback(null, results);
      } else {
        callback(null, results);
      }
    }
  });
};

const addFine = (fine, callback) => {
  db.query(
    sql.addFine,
    [fine.amount, fine.date, fine.courtFile, fine.courthouseId, fine.subjectId],
    (err, results) => {
      if (err) {
        console.log('Error executing query: ', err);
        callback(err, null);
      } else {
        const insertedFineId = results.insertId;
        callback(null, insertedFineId);
      }
    }
  );
};

const deleteFine = (id, callback) => {
  db.query(sql.deleteFine, id, (err, result) => {
    if (err) {
      console.log('Error executing delete: ', err);
      callback(err);
    } else {
      if (result.affectedRows === 0) {
        callback(new Error('Fine not found'));
      } else {
        callback(null);
      }
    }
  });
};

const updateFine = (fine, callback) => {
  db.query(
    sql.updateFine,
    [
      fine.amount,
      fine.date,
      fine.courtFile,
      fine.courthouseId,
      fine.subjectId,
      fine.datePaid,
      fine.fineId,
    ],
    (err, result) => {
      if (err) {
        console.log('Error executing update: ', err);
        callback(err);
      } else {
        if (result.affectedRows === 0) {
          callback(new Error('Fine not found'));
        } else {
          callback(null);
        }
      }
    }
  );
};

module.exports = {
  getFines,
  getFine,
  getFinesOverdue,
  getFinesByCourthouse,
  getFinesBySubject,
  addFine,
  deleteFine,
  updateFine,
};
