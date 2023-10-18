const db = require('../../config/db');

const login = (username, callback) => {
  const sql = 'SELECT * FROM USER WHERE Username = ?;';

  db.query(sql, username, (err, results) => {
    if (err) {
      console.log('Error executing the query: ', err);
      callback(err, null);
    } else {
      if (results.length === 1) {
        callback(null, results);
      } else {
        callback(new Error('Invalid Username/Password combination'), null);
      }
    }
  });
};

const register = (username, password, callback) => {
  const sql = 'INSERT INTO USER (username, password) VALUES (?,?);';

  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.log('Error executing insert: ', err);
      callback(err, null);
    } else {
      const insertedUserId = results.insertId;
      callback(null, insertedUserId);
    }
  });
};

module.exports = {
  login,
  register,
};
