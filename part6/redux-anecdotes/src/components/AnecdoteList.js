import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const sortedAnecdotes = state.anecdotes.slice().sort((a, b) => b.votes - a.votes)
    if (state.filter === '') return sortedAnecdotes
    const regex = new RegExp(String.raw`${state.filter}`, 'ig')
    return sortedAnecdotes.filter(({content}) => regex.test(content))
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(increaseVote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
