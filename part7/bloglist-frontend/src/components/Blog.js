import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, handleBlogUpdate, handleBlogRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [blogDetailIsShown, setBlogDetailsIsShown] = useState(false)

  const dispatch = useDispatch()

  const handleLikes = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    try {
      await blogService.modify(blog.id, updatedBlog)
      handleBlogUpdate(blog)
    } catch (err) {
      const errorMessage = err.response.data.error || err.message
      dispatch(setNotification(`Error. Like hasn't been added: ${errorMessage}`, true, 5))
    }
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        handleBlogRemove(blog)
      } catch (err) {
        const errorMessage = err.response.data.error || err.message
        dispatch(setNotification(`Error. Blog hasn't been removed: ${errorMessage}`, true, 5))
      }
    }
  }

  const blogDetailButton = () => (
    <button onClick={() => setBlogDetailsIsShown(!blogDetailIsShown)}>{blogDetailIsShown ? 'hide' : 'view'}</button>
  )

  const likeButton = () => <button onClick={handleLikes}>like</button>

  const detail = () => (
    <div className="detail">
      <p>{blog.url}</p>
      <p className="likes">
        likes {blog.likes} {likeButton()}
      </p>
      <p>{blog.author}</p>
      <button onClick={handleRemove}>remove</button>
    </div>
  )

  return (
    <div style={blogStyle} className="blog">
      <span>
        {blog.title} {blog.author}
      </span>{' '}
      {blogDetailButton()}
      {blogDetailIsShown && detail()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleBlogUpdate: PropTypes.func.isRequired,
  handleBlogRemove: PropTypes.func.isRequired,
}

export default Blog
