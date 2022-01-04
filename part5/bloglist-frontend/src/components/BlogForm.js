import React from 'react'
import CreateNewBlog from './CreateNewBlog'
import Blog from './Blog'
import Togglable from './Toggable'
import blogService from '../services/blogs'
import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleLogout, handleNotification, user }) => {
  const [blogs, setBlogs] = useState([])
  const newBlogRef = useRef()

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const sortBlogs = (blogs) => blogs.concat().sort((firstEl, secondEl) => secondEl.likes - firstEl.likes)
    setBlogs(sortBlogs(blogs))
  }, [blogs.length])

  const createNewBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      handleNotification(`a new blog: ${newBlog.title} by ${newBlog.author} added`, false)
      newBlogRef.current.toggleVisibility()
    } catch (error) {
      const errorMessage = error.response.data.error || error.message
      handleNotification(`Error to adding new blog: ${errorMessage}`, true)
    }
  }

  const handleBlogUpdate = (blog) => {
    const updatedBlogs = blogs.map((b) => {
      return b.id === blog.id ? { ...blog, likes: blog.likes + 1 } : b
    })

    setBlogs(updatedBlogs)
  }

  const handleBlogRemove = (blog) => {
    const updatedBlogs = blogs.filter(b => blog.id !== b.id)
    setBlogs(updatedBlogs)
  }

  return (
    <div>
      <h2>blogs</h2>

      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel={'create new blog'} ref={newBlogRef}>
        <CreateNewBlog createNewBlog={createNewBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleBlogUpdate={handleBlogUpdate} handleBlogRemove={handleBlogRemove} handleNotification={handleNotification} />
      ))}
    </div>
  )
}

BlogForm.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  handleNotification: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default BlogForm
