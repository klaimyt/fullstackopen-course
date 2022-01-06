const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INCREASE_VOTE':
      const updatedAnecdotes = state.map(anectode => 
        anectode.id === action.data.id ? {...anectode, votes: anectode.votes + 1} : anectode
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

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export const increaseVote = (id) => {
  return {
    type: 'INCREASE_VOTE',
    data: {
      id
    }
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'ADD_ANECDOTE',
    data: {
      anecdote
    }
  } 
}

export default reducer