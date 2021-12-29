const Blog = require('../models/blog');

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
};
