require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const app = express();
const config = require('./utils/config');
const logger = require('./utils/logger');

logger.info('Connecting to DB...');

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('DB Connected!'))
  .catch((err) => logger.error('DB Connection error!: ', err));

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/login', loginRouter);
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
