const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (likesSum, blog) => {
    return likesSum + blog.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const maximumLikes = Math.max.apply(
    Math,
    blogs.map((blog) => {
      return blog.likes;
    })
  );
  const favoriteBlog = blogs.find((blog) => blog.likes === maximumLikes);
  return favoriteBlog
    ? {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes,
      }
    : null;
};

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length < 1) return null;
  const authors = _(blogs).countBy("author").value();
  const maxValue = _(authors).max().value();
  const mostBlogs = Object.entries(authors).filter((arr) => arr.includes(maxValue));

  return mostBlogs.length > 0
    ? {
        author: mostBlogs[0][0],
        blogs: mostBlogs[0][1],
      }
    : null;
};

const mostLikes = (blogs) => {
  if (!Array.isArray(blogs)) return null;

  const reducer = (prev, current) => {
    if (!prev[current.author]) {
      return {
        ...prev,
        [current.author]: current.likes,
      };
    } else {
      const likes = prev[current.author];
      return {
        ...prev,
        [current.author]: likes + current.likes,
      };
    }
  };

  const authors = blogs.reduce(reducer, {});
  const maxValue = _(authors).max().value();
  const mostLikes = Object.entries(authors).filter((arr) => arr.includes(maxValue));

  return mostLikes.length > 0
    ? {
        author: mostLikes[0][0],
        likes: mostLikes[0][1],
      }
    : null;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
