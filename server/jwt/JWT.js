require('dotenv').config();
const { sign, verify, decode } = require('jsonwebtoken');

const createToken = user => {
  const token = sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: 5000 }
  );

  return token;
};

const validateToken = (req, res, next) => {
  const token = req.cookies['frpToken'];

  if (!token) {
    return res.status(403).json({ error: 'User not authenticated' });
  }

  try {
    const validToken = verify(token, process.env.JWT_SECRET);
    if (validToken) {
      decodedToken = decode(token);
      req.role = decodedToken.role;
      req.username = decodedToken.username;
      next();
    } else {
      return res.status(403).json({ error: 'User not autenticated' });
    }
  } catch (err) {
    return res.status(403).json({ error: err });
  }
};

module.exports = {
  createToken,
  validateToken,
};
