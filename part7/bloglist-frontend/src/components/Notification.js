import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ text, isError }) => {
  const style = {
    color: isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (text) {
    return (
      <div style={style} className="notification">
        {text}
      </div>
    )
  }

  return null
}

const mapStateToProps = (state) => {
  return {
    text: state.notification.text,
    isError: state.notification.isError,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
