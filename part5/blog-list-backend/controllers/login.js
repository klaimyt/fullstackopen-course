const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordCorret = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorret)) {
    return res.status(401).json({
      error: 'Invalid username or password',
    });
  }

  const userTokent = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userTokent, process.env.SECRET);

  res.status(200).send({ token, username: user.username, name: user.username });
});

module.exports = loginRouter;
