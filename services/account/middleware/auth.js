const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  
  // Extract the token from the Authorization header.
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).send('No token provided');
  }

  // Authorization header contains 'Bearer token'.
  const token = header.split(' ')[1]; 


  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).send('Invalid or expired token');
    }
    next();
  });
};