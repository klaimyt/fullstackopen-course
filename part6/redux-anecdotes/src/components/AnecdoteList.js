import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') return state.anecdotes
    const regex = new RegExp(String.raw`${state.filter}`, 'ig')
    return state.anecdotes.filter(({content}) => regex.test(content))
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(increaseVote(id))
    const {content}= anecdotes.find(anecdote => anecdote.id === id)
    const timeout = setTimeout(() => dispatch(removeNotification()), 5000)
    dispatch(setNotification(`you voted '${content}'`, timeout))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
