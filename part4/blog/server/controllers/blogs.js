const blogsRouter =
  require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get(
  '/',
  async (req, res) => {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  }
);

blogsRouter.get(
  '/:id',
  async (req, res) => {
    const blog = Blog.findById(
      req.params.id
    );

    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).end();
    }
  }
);

blogsRouter.post(
  '/',
  async (req, res) => {
    const blog = new Blog(req.body);
    if (!blog.likes) {
      blog.likes = 0;
    }
    await blog.save();

    res.status(201).json(blog);
  }
);

blogsRouter.delete(
  '/:id',
  async (req, res) => {
    await Blog.findByIdAndDelete(
      req.params.id
    );
    res.status(204).end();
  }
);

blogsRouter.put(
  '/:id',
  async (req, res) => {
    const blog =
      await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json(result);
  }
);

module.exports = blogsRouter;
