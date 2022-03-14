const jwt = require('jsonwebtoken');
const User = require('../models/user');

const errorHandler = (error, req, res, next) => {
  if (error.message === "Cannot read property 'user' of null") {
    return res.status(404).end()
  }

  switch (error.name) {
    // Is case error a bad practice?
    case 'Error':
    case 'ValidationError':
    case 'MongoServerError':
    case 'MongooseError':
      return res.status(400).send({ error: error.message });
    case 'CastError':
      return res.status(404).send({ error: 'malformatted id' });
    case 'JsonWebTokenError':
      return res.status(401).json({ error: 'invalid token' });
    case 'TokenExpiredError':
      return res.status(401).json({ error: 'token expired' });
    default:
      next(error);
  }
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (req, res, next) => {
  req.decodedToken = jwt.verify(req.token, process.env.SECRET);
  req.user = await User.findById(req.decodedToken.id);
  if (!(req.user && req.decodedToken)) return res.status(401).json({ error: 'Invalid token' });

  next();
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
};
