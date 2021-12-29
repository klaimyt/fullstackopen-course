const notesRouter = require('express').Router();
const Blog = require('../models/blog');

notesRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

notesRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

notesRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  const result = await blog.save();

  response.status(201).json(result);
});

notesRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

notesRouter.put('/:id', async (request, response) => {
  const blog = await Blog
    .findByIdAndUpdate(request.params.id, request.body, { runValidators: true, new: true });

  response.send(blog);
});

module.exports = notesRouter;
