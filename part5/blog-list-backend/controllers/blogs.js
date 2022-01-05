const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, id: 1 });
  res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).end();
  res.json(blog);
});

blogsRouter.post('/', userExtractor, async (req, res) => {
  req.body.user = req.user.id.toString();
  const blog = new Blog(req.body);

  const result = await blog.save();
  req.user.blogs.push(blog.id.toString());
  await req.user.save();
  res.status(201).json(result);
});

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog.user.toString() !== req.user.id.toString()) {
    return res.status(403).json({ error: 'You have no access to delete this blog ' });
  }
  req.user.blogs = req.user.blogs.filter((b) => b.toString() !== blog.id.toString());
  await req.user.save();
  await blog.delete();
  res.status(204).end();
});

blogsRouter.put('/:id', userExtractor, async (req, res) => {
  let blog = await Blog.findById(req.params.id);

  if (blog.user.toString() !== req.user.id.toString()) {
    return res.status(403).json({ error: 'You have no access to modify this blog' });
  }

  blog = await blog.updateOne(req.body, { runValidators: true, new: true });

  res.send(blog);
});

module.exports = blogsRouter;
