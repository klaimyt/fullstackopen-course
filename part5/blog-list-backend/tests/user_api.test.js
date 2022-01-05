const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
});

describe('Create new user', () => {
  test('with invalid password length', async () => {
    const newUser = {
      username: 'user1',
      password: '12',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);
    expect(response.body).toEqual({ error: "Password validation fail: 'password' must be at least 3 characters long" });
  });

  test('with invalid username length', async () => {
    const newUser = {
      username: '1',
      password: '123',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);
    expect(response.body).toEqual({
      error: 'User validation failed: username: Path `username` (`1`) is shorter than the minimum allowed length (3).',
    });
  });

  test('without data', async () => {
    const response = await api.post('/api/users').send({}).expect(400);
    expect(response.body).toEqual({ error: "Password validation fail: 'password' is required" });
  });

  test('when username already exists', async () => {
    const newUser = {
      username: 'root',
      password: 'root',
    };

    await api.post('/api/users').send(newUser).expect(201);

    const response = await api.post('/api/users').send(newUser).expect(400); // Should it be 409?
    expect(response.body).toEqual({
      error: 'User validation failed: username: Error, expected `username` to be unique. Value: `root`',
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
