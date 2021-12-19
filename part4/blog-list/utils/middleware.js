const errorHandler = (error, request, response, next) => {
  if (error.name === "MongoServerError") {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "CastError") {
    return response.status(404).send({ error: "malformatted id" });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

module.exports = {
  errorHandler,
  unknownEndpoint,
};
