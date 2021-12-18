const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
const Person = require('./Models/Person')
const errorHandler = require('./middlewares/ErrorHandler')

const app = express()
morgan.token('request-content', (req) => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-content'))
app.use(cors())
app.use(express.static('build'))

app.get('/api', (req, res) => {
  res.send('<h1>Use \'api/persons\' route</h1>')
})

app.get('/api/info', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      const page = `
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  `
      res.send(page)
    })
    .catch((err) => next(err))
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch((err) => next(err))
})

app.post('/api/persons', (req, res, next) => {
  new Person(req.body)
    .save()
    .then((person) => res.status(201).json(person))
    .catch((err) => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person)
    })
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
    .then((person) => res.send(person))
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((err) => next(err))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT)
console.log(`Server is running on port ${PORT}`)
