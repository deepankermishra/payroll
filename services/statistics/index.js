const express = require('express');
const bodyParser = require('body-parser');

const authMiddleware = require('./middleware/auth');
const statsRouter = require('./api/stats');
const recordRouter = require('./api/record');
const healthRouter = require('./api/health');

const app = express();

// These paths are public.
app.use(bodyParser.json());

// Unauthenticated APIs.
app.use('/health', healthRouter);

// Authenticated APIs.
app.use('/api', authMiddleware)
app.use('/api', statsRouter)
app.use('/api', recordRouter)

// Start listening.
const port = process.env.SERVICE_PORT;
app.listen(port, () => {
  console.log(`Stats service running on http://localhost:${port}`);
});
