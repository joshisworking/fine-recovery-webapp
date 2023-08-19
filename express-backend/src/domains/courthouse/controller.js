const db = require('../../config/db');

const getCourthouses = callback => {
  const sql = 'SELECT * FROM COURTHOUSE';
  db.query(sql, (err, results) => {
    if (err) {
      console.log('Error executing the query:', err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getCourthouse = (id, callback) => {
  const sql = 'SELECT * FROM COURTHOUSE WHERE CourthouseId = ?';
  db.query(sql, id, (err, results) => {
    if (err) {
      console.log('Error executing the query: ', err);
      callback(err, null);
    } else {
      if (results.length === 0) {
        callback(new Error('Courthouse not found'), null);
      } else {
        callback(null, results);
      }
    }
  });
};

const addCourthouse = (courthouse, callback) => {
  const sql = `
    INSERT INTO COURTHOUSE (Name, City, Province)
    VALUES (?, ?, ?);
  `;

  db.query(
    sql,
    [courthouse.name, courthouse.city, courthouse.province],
    (err, results) => {
      if (err) {
        console.log('Error executing insert: ', err);
        callback(err, null);
      } else {
        const insertedCourthouseId = results.insertId;
        callback(null, insertedCourthouseId);
      }
    }
  );
};

const deleteCourthouse = (id, callback) => {
  const sql = 'DELETE FROM COURTHOUSE WHERE CourthouseId = ?';

  db.query(sql, id, (err, result) => {
    if (err) {
      console.log('Error executing delete: ', err);
      callback(err);
    } else {
      if (result.affectedRows === 0) {
        callback(new Error('Courthouse not found'));
      } else {
        callback(null);
      }
    }
  });
};

const updateCourthouse = (courthouse, callback) => {
  const sql = `
    UPDATE COURTHOUSE
    SET 
      Name = ?,
      City = ?,
      Province = ?
    WHERE CourthouseId = ?;
  `;

  db.query(
    sql,
    [
      courthouse.name,
      courthouse.city,
      courthouse.province,
      courthouse.courthouseId,
    ],
    (err, results) => {
      if (err) {
        console.log('Error executing udpate: ', err);
        callback(err);
      } else {
        if (results.affectedRows === 0) {
          callback(new Error('Courthouse not found'));
        } else {
          callback(null);
        }
      }
    }
  );
};

module.exports = {
  getCourthouses,
  getCourthouse,
  addCourthouse,
  deleteCourthouse,
  updateCourthouse,
};
