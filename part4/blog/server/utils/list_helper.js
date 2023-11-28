const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  if (blogs.length === 1) {
    return blogs[0].likes;
  }

  return blogs.reduce(
    (sum, blog) => sum + blog.likes,
    0
  );
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  if (blogs.length === 1) {
    return {
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes,
    };
  }

  const blog = blogs.reduce(
    (cal, cur) => {
      return cur.likes > cal.likes
        ? cur
        : cal;
    },
    blogs[0]
  );

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
  };
};

const mostBlogs = (blogs) => {
  const authors = blogs.reduce(
    (cal, cur) => {
      if (cal[cur.author]) {
        cal[cur.author] += 1;
      } else {
        cal[cur.author] = 1;
      }
      return cal;
    },
    {}
  );

  const author = Object.keys(
    authors
  ).reduce((cal, cur) => {
    return authors[cal] > authors[cur]
      ? cal
      : cur;
  });
  return {
    author,
    blogs: authors[author],
  };
};

const mostLikes = (blogs) => {
  const authors = blogs.reduce(
    (cal, cur) => {
      if (cal[cur.author]) {
        cal[cur.author] += cur.likes;
      } else {
        cal[cur.author] = cur.likes;
      }
      return cal;
    },
    {}
  );

  const author = Object.keys(
    authors
  ).reduce((cal, cur) =>
    authors[cur] > authors[cal]
      ? cur
      : cal
  );

  return {
    author,
    likes: authors[author],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
