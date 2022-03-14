const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.post('/', async (req, res) => {
  const { body } = req;

  if (!body.password) throw new Error('Password validation fail: \'password\' is required');
  if (body.password.length < 3) throw new Error('Password validation fail: \'password\' must be at least 3 characters long');

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs');
  res.json(users);
});

module.exports = userRouter;
