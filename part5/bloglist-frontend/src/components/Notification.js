import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  const { message, isError } = notification || { message: null, isError: null }

  const style = {
    color: isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
    return null
  }

  return <div style={style}>{message}</div>
}

Notification.protoTypes = {
  notification: PropTypes.object.isRequired
}

export default Notification