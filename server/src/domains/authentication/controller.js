const db = require('../../config/db');

const login = (username, password, callback) => {
  const sql = 'SELECT Username, Password FROM USER WHERE Username = ?;';

  db.query(sql, username, (err, results) => {
    if (err) {
      console.log('Error executing the query: ', err);
      callback(err, null);
    } else {
      if (results.length === 1) {
        if (results[0].Password === password) {
          callback(null, results);
        }
      }
      callback(new Error('Invalid Username/Password combination'), null);
    }
  });
};

const register = (username, password, callback) => {
  const sql = 'INSERT INTO USER (Username, Password) VALUES (?,?);';

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
