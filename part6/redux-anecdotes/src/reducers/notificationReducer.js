export const setNotification = (text, timeout) => {

  return {
    type: 'SET_NOTIFICATION',
    notification: {
      text,
      timeout
    }
  }
}

export const removeNotification = () => ({ type: 'REMOVE_NOTIFICATION' })

const initialNotification = {
  text: '',
  timeout: null
}

const notificationReducer = (state = initialNotification, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      if (state.timeout !== null) {
        clearTimeout(state.timeout)
      }
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return initialNotification
    default:
      return state
  }
}

export default notificationReducer