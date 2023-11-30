const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'First Author',
    url: 'https://www.firstblog.com',
    likes: 1,
  },
  {
    title: 'Second Blog',
    author: 'Second Author',
    url: 'https://www.secondblog.com',
    likes: 2,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'willremovethissoon',
    url: 'willremovethissoon',
    likes: 0,
  });

  await blog.save();
  await Blog.findByIdAndDelete(blog.id);

  return blog.id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) =>
    blog.toJSON()
  );
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
