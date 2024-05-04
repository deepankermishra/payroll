const jwt = require('jsonwebtoken');
const express = require('express');
const { addUser, getUserByUsername } = require('../db/in_memory');
const cryptoUtils = require('../utils/crypto');

const router = express.Router();

// Should be maintained in a Secret Manager in production.
const SECRET_KEY = process.env.JWT_SECRET_KEY;

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const caseInsensitiveUsername = username.toLowerCase();

  const user = getUserByUsername(username);

  if (!user) {
    return res.status(401).send('Authentication failed');
  }

  const validPassword = cryptoUtils.verifyPassword(user.password, password);
  if (!validPassword) {
    return res.status(401).send('Authentication failed');
  }

  const tokenPayload = { username: user.username, isAdmin: user.isAdmin }; // Would have tenant ID if multi-tenanted
  const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: '24h' }); // Token expires in 24 hours

  return res.json({ token });
});

router.post('/signup', async (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  const caseInsensitiveUsername = username.toLowerCase();
  if (getUserByUsername(caseInsensitiveUsername)) {
    return res.status(409).send('Username already exists');
  }

  if (password.length < 6) {
    return res.status(400).send('Password must be at least 6 characters long');
  }

  const newUser = { username: caseInsensitiveUsername, password, isAdmin: false , name };
  const userId = addUser(newUser);

  return res.status(200).send({ userId, message: 'User created successfully' });
});

module.exports = router;
