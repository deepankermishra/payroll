const jwt = require('jsonwebtoken');

const { getUserByUsername } = require('../db/in_memory');

module.exports = async (req, res, next) => {
  
  // Extract the token from the Authorization header.
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).send('No token provided');
  }

  // Authorization header contains 'Bearer token'.
  const token = header.split(' ')[1]; 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    if (!getUserByUsername(decoded.username)) {
      return res.status(404).send('User not found');
    }
    
    next();
  } catch (err) {
    return res.status(403).send('Invalid or expired token');
  }
};
