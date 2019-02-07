const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const {Http404} = require('./errors')
const links = require('./providers/links')
const services = require('./providers/services')

const app = express()
app.use(helmet())

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', true)
  app.use(morgan('combined'))
} else {
  app.use(morgan('dev'))
}

app.use('/links', links)
app.use('/services', services)

app.use((req, res, next) => {
  next(new Http404())
})

app.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
  const {statusCode = 500} = error

  if (typeof error.toJSON === 'function') {
    return res.status(statusCode).send(error.toJSON())
  }

  res.status(statusCode).send({
    code: statusCode,
    error: 'An unexpected error happened'
  })
})

module.exports = app
