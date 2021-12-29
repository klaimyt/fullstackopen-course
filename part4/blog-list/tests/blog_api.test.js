const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);

describe('when there is initially some blogs saved', () => {
  test('all blogs are returned', async () => {
    const { blogs } = await helper.createUserAndBlogs(api);
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(blogs.length);
  });
});

describe('viewing a specific blog', () => {
  test('has id parameter', async () => {
    const { blogs } = await helper.createUserAndBlogs(api);
    const response = await api.get('/api/blogs');

    const ids = response.body.map((r) => r.id);

    expect(ids).toHaveLength(blogs.length);
  });

  test('deleting a specific blog', async () => {
    const { user, blogs } = await helper.createUserAndBlogs(api);

    const [firstBlog] = blogs;

    await api.delete(`/api/blogs/${firstBlog.id}`).set('Authorization', `bearer ${user.token}`).expect(204);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(blogs.length - 1);
  });

  test('updating a specific blog', async () => {
    const { user, blogs } = await helper.createUserAndBlogs(api);

    const [firstBlog] = blogs;

    const updatedBlog = { ...firstBlog, likes: 1000 };

    await api
      .put(`/api/blogs/${firstBlog.id}`)
      .set('Authorization', `bearer ${user.token}`)
      .send(updatedBlog)
      .expect(200);

    const response = await api.get(`/api/blogs/${firstBlog.id}`);
    expect(response.body).toEqual(updatedBlog);
  });

  test('deleting a specific blog without JWT token', async () => {
    const { blogs } = await helper.createUserAndBlogs(api);

    const [firstBlog] = blogs;

    await api.delete(`/api/blogs/${firstBlog.id}`).expect(401);
  });

  test('deleting a specific blog from another user', async () => {
    const { blogs } = await helper.createUserAndBlogs(api);

    const [firstBlog] = blogs;

    const { token } = await helper.dummyUser(api);

    await api.delete(`/api/blogs/${firstBlog.id}`).set('Authorization', `bearer ${token}`).expect(403);
  });
});

describe('Addition of new blog', () => {
  test('Succeeds with correct data', async () => {
    const { blogs, user } = await helper.createUserAndBlogs(api);
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${user.token}`)
      .send({
        title: 'test',
        author: 'a',
        url: 'a',
        likes: 5,
      })
      .expect(201);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(blogs.length + 1);
  });

  test('Succeeds with empty likes', async () => {
    const { token } = await helper.dummyUser(api);
    const request = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send({ title: 'test', author: 'a', url: 'a' })
      .expect(201);

    const response = await api.get(`/api/blogs/${request.body.id}`);

    expect(response.body.likes).toBe(0);
  });

  test('Failed without title and author', async () => {
    const { token } = await helper.dummyUser(api);
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send({ likes: 0, url: 'test.com' })
      .expect(400);
  });

  test('Failed without JWT token', async () => {
    await api.post('/api/blogs').send({ title: 'test', author: 'a', url: 'a' }).expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
