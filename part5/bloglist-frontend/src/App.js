import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import CreateNewBlog from "./components/CreateNewBlog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    isError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      const errorMessage = error.response.data.error || error.message;
      setNotification({
        message: `Error to log-in: ${errorMessage}`,
        isError: true,
      });
      setTimeout(() => setNotification({ message: null, isError: null }), 5000);
    }
  };

  const handleNewBlog = async (event) => {
    event.preventDefault();

    const { target } = event;

    const newBlog = {
      title: target.title.value,
      author: target.author.value,
      url: target.url.value,
    };

    try {
      const response = await blogService.create(newBlog);
      setBlogs(blogs.concat(response));
      target.reset();
      setNotification({
        message: `a new blog: ${newBlog.title} by ${newBlog.author} added`,
        isError: false,
      });
      setTimeout(() => setNotification({ message: null, isError: null }), 5000);
    } catch (error) {
      const errorMessage = error.response.data.error || error.message;
      setNotification({
        message: `Error to adding new blog: ${errorMessage}`,
        isError: true,
      });
      setTimeout(() => setNotification({ message: null, isError: null }), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    blogService.setToken(null);
  };

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );

  const blogForm = () => (
    <>
      <h2>blogs</h2>

      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>logout</button>

      <CreateNewBlog handleNewBlog={handleNewBlog} />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? loginForm() : blogForm()}
    </div>
  );
};

export default App;
