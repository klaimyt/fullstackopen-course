const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// I decided to sort likes here, but it's also possible to do it in AnecdoteList when useSelector
const sortedVotes = (anecdotes) => anecdotes.sort((a, b) => b.votes - a.votes)


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
      anecdote: asObject(anecdote)
    }
  } 
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INCREASE_VOTE':
      const updatedAnecdotes = state.map(anectode => 
        anectode.id === action.data.id ? {...anectode, votes: anectode.votes + 1} : anectode
      )
      return sortedVotes(updatedAnecdotes)
    case 'ADD_ANECDOTE':
      return [...state, action.data.anecdote]
    default:
      return state
  }
}

export default reducer