const errorHandler = (error, request, response, next) => {
  if(error.name === 'MongoServerError') {
    return response.status(400).send({ error: error.message })
  }

  if(error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  if(error.name === 'CastError') {
    return response.status(404).send({ error: 'malformatted id' })
  }

  next(error)
}

module.exports = errorHandler