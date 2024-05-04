const express = require('express');
const bodyParser = require('body-parser');

const authMiddleware = require('./middleware/auth');
const statsRouter = require('./api/stats');
const recordRouter = require('./api/record');

const app = express();

// These paths are public.
app.use(bodyParser.json());

// Authenticated APIs.
app.use('/api', authMiddleware, statsRouter, recordRouter)

// Start listening.
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Stats service running on http://localhost:${port}`);
});
