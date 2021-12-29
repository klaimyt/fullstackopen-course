const notesRouter = require("express").Router();
const Blog = require("../models/blog");

notesRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
});

notesRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

notesRouter.post("/", async (request, response, next) => {
  try {
    const blog = new Blog(request.body);

    const result = await blog.save()

    response.status(201).json(result);
  } catch (err) {
    next(err)
  }
});

module.exports = notesRouter
