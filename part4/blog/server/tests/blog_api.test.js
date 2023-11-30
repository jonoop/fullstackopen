const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const mongoose = require('mongoose');
mongoose.set('bufferTimeoutMS', 30000);
const helper = require('./blog_helper');
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects =
    helper.initialBlogs.map(
      (blog) => new Blog(blog)
    );
  const promiseArray = blogObjects.map(
    (blog) => blog.save()
  );
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect(
      'Content-Type',
      /application\/json/
    );
}, 10000);

test('the unique identifier property of the blog posts is named id', async () => {
  const blogsAtStart =
    await helper.blogsInDb();
  const blogToView = blogsAtStart[0];
  expect(blogToView.id).toBeDefined();
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'testaaa',
    author: 'testaaa',
    url: 'http://',
    likes: 2,
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect(
      'Content-Type',
      /application\/json/
    );
  const blogsAtEnd =
    await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length + 1
  );

  const titles = await blogsAtEnd.map(
    (r) => r.title
  );

  expect(titles).toContain(
    newBlog.title
  );
});

test('if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: 'testaaa',
    author: 'testaaa',
    url: 'http://',
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201);
  const blogsAtEnd =
    await helper.blogsInDb();
  expect(
    blogsAtEnd[
      helper.initialBlogs.length
    ].likes
  ).toBe(0);
});

afterAll(async () => {
  await mongoose.connection.close();
});
