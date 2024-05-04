const express = require('express');
const bodyParser = require('body-parser');
// const statisticsRouter = require('./api/statistics');
const authRouter = require('./api/auth');

const authMiddleware = require('./middleware/auth');
const userRouter = require('./api/user');

const app = express();

// These paths are public.
app.use(bodyParser.json());
app.use('/auth', authRouter);

// Authenticated APIs.
app.use('/api', authMiddleware, userRouter);

// Start listening.
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Account service running on http://localhost:${port}`);
});
