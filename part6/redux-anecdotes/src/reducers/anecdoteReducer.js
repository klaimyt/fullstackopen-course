import anecdoteServices from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INCREASE_VOTE':
      const updatedAnecdotes = state.map(anectode => 
        anectode.id === action.data.anecdote.id ? action.data.anecdote : anectode
      )
      return updatedAnecdotes
    case 'ADD_ANECDOTE':
      return [...state, action.data.anecdote]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const increaseVote = (anecdote) => {
  return async dispatch => {
    const response = await anecdoteServices.updateVotes(anecdote)
    dispatch({
      type: 'INCREASE_VOTE',
      data: {
        anecdote: response
      }
    })
  }
}

export const createAnecdote = (newAnecdote) => {
  return async dispatch => {
    const anecdote = await anecdoteServices.create(newAnecdote)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: {
        anecdote
      }
    })
  }
}

export default reducer