import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (e) => {
    e.preventDefault()
    
    const anecdote = e.target.anecdote.value
    dispatch(createAnecdote(anecdote))
    const timeout = setTimeout(() => dispatch(removeNotification()), 5000)
    dispatch(setNotification(`you created a new anecdote '${anecdote}'`, timeout))

    e.target.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
