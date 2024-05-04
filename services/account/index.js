const express = require('express');
const bodyParser = require('body-parser');
// const statisticsRouter = require('./api/statistics');
const authRouter = require('./api/auth');

const authMiddleware = require('./middleware/auth');
const userRouter = require('./api/user');

const healthRouter = require('./api/health');

const app = express();


app.use(bodyParser.json());

// Unauthenticated APIs.
app.use('/auth', authRouter);
app.use('/health', healthRouter);

// Authenticated APIs.
app.use('/api', authMiddleware, userRouter);

// Start listening.
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Account service running on http://localhost:${port}`);
});
