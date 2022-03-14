const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'My first blog',
    author: 'klaimyt',
    url: 'http://thisisanurl.com',
    likes: 4,
  },
  {
    title: 'My second blog',
    author: 'klaimyt',
    url: 'http://thisisanurl.com',
  },
];

const dummyUser = async (api) => {
  const newUser = { username: 'dummyUser', password: '123' };
  await User.deleteOne({ username: newUser.username });
  await api.post('/api/users').send(newUser);
  const response = await api.post('/api/login').send(newUser);
  return response.body;
};

const createUserAndBlogs = async (api) => {
  const user = await dummyUser(api);
  await Blog.deleteMany({});

  const promises = initialBlogs.map((blog) => api.post('/api/blogs').set('Authorization', `bearer ${user.token}`).send(blog));

  const response = await Promise.all(promises);
  const blogs = response.map((r) => r.body);
  return { blogs, user };
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Will be removed', author: 'anonim', url: '', likes: 0,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});

  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  dummyUser,
  createUserAndBlogs,
};
