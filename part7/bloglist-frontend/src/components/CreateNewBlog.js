import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateNewBlog = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = (e) => {
    e.preventDefault()
    createNewBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={addNewBlog}>
        <div>
          title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="title" />
        </div>
        <div>
          author:
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} name="author" />
        </div>
        <div>
          url:
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} name="url" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

CreateNewBlog.propTypes = {
  createNewBlog: PropTypes.func.isRequired,
}

export default CreateNewBlog
