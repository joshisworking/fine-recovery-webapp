const db = require('../../config/db');

const getUsers = callback => {
  const sql = 'SELECT * FROM USER;';
  const result = db.query(sql, (err, results) => {
    if (err) {
      console.log(`ERROR: ${err.message}`);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getUser = (userId, callback) => {
  const sql = 'SELECT * FROM USER WHERE UserId = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error executing the query:', err.message);
      callback(err, null);
    } else {
      if (result.length === 0) {
        callback(new Error('User not found'), null);
      } else {
        callback(null, result[0]);
      }
    }
  });
};

const addUser = (user, callback) => {
  const sql = `
    INSERT INTO USER (username, email)
    VALUES (?, ?);`;
  const { username, email } = user;

  db.query(sql, [username, email], (err, result) => {
    if (err) {
      console.error('Error executing insert:', err.message);
      callback(err, null);
    } else {
      const insertedUserId = result.insertId;
      callback(null, insertedUserId);
    }
  });
};

const deleteUser = (userId, callback) => {
  const sql = 'DELETE FROM USER WHERE UserId = ?;';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error executing deletion:', err.message);
      callback(err, null);
    } else {
      if (result.affectedRows === 0) {
        callback(new Error('User not found'));
      } else {
        callback(null);
      }
    }
  });
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  deleteUser,
};
