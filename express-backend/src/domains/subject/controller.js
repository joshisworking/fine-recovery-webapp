const { query } = require('express');
const db = require('../../config/db');

const getSubjects = callback => {
  const sql = 'SELECT * FROM Subject';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing the query:', err.message);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getSubject = (id, callback) => {
  const sql = 'SELECT * FROM Subject WHERE subjectId = ?';
  db.query(sql, id, (err, results) => {
    if (err) {
      console.error('Error executing the query:', err.message);
      callback(err, null);
    } else {
      if (results.length === 0) {
        callback(new Error('Subject not found'), null);
      } else {
        callback(null, results);
      }
    }
  });
};

const getSubjectByName = (searchString, callback) => {
  const sql = 'SELECT SubjectId, Name FROM SUBJECT WHERE NAME LIKE ?';
  db.query(sql, searchString, (err, results) => {
    console.log(query);
    if (err) {
      console.error('Error executing the query:', err.message);
      callback(err, null);
    } else {
      if (results.length === 0) {
        callback(new Error('Subject not found'), null);
      } else {
        callback(null, results);
      }
    }
  });
};

const addSubject = (subject, callback) => {
  const sql = 'INSERT INTO Subject (name, dob) VALUES (?,?);';
  db.query(sql, [subject.name, subject.dob], (err, results) => {
    if (err) {
      console.error('Error executing the query:', err.message);
      callback(err, null);
    } else {
      const insertedSubjectId = results.insertId;
      callback(null, insertedSubjectId);
    }
  });
};

const deleteSubject = (id, callback) => {
  const sql = 'DELETE FROM Subject WHERE subjectId = ?';
  db.query(sql, id, (err, result) => {
    if (err) {
      console.error('Error executing deletion:', err.message);
      callback(err, null);
    } else {
      if (result.affectedRows === 0) {
        callback(new Error('Subject not found'));
      } else {
        callback(null);
      }
    }
  });
};

module.exports = {
  getSubjects,
  getSubject,
  addSubject,
  deleteSubject,
  getSubjectByName,
};
