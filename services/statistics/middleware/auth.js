// Could be made common in both the services.
// Could also be moved to envoy edge validation.
const jwt = require('jsonwebtoken');
const axios = require('axios');

const ACCOUNT_SERVICE_URL = process.env.ACCOUNT_SERVICE_URL;
const ACCOUNT_SERVICE_PORT = process.env.ACCOUNT_SERVICE_PORT;

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

    const accountApiUrl = `${ACCOUNT_SERVICE_URL}:${ACCOUNT_SERVICE_PORT}/api/user/${decoded.username}`;
    // Make a request to the account service to fetch the user details.
    const response = await axios.get( accountApiUrl, {
        headers: {
            Authorization: header,
        }
    });

    // Add user details to request object if needed later in the pipeline.
    req.user = response.data;

    next();
  } catch (err) {

    if (err.response && err.response.status === 404) {

      return res.status(404).send('User not found');

    } else if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {

      return res.status(403).send('Invalid or expired token');

    } else {

      return res.status(500).send('Internal server error');

    }
  }
};
