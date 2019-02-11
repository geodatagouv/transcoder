const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const sentry = require('../sentry')

const {HttpError, Http404} = require('./errors')
const links = require('./providers/links')
const services = require('./providers/services')

const app = express()

app.use(cors({origin: true}))

if (process.env.NODE_ENV === 'production') {
  app.disable('x-powered-by')
  app.set('trust proxy', true)
  app.use(morgan('combined'))

  app.use(sentry.Handlers.requestHandler())
} else {
  app.use(morgan('dev'))
}

app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'robots.txt'))
})

app.use('/links', links)
app.use('/services', services)

app.use((req, res, next) => {
  next(new Http404())
})

app.use(sentry.Handlers.errorHandler())
app.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
  if (error instanceof HttpError) {
    res.status(error.statusCode).send(error.toJSON())
  } else {
    res.status(500).send({
      code: 500,
      sentry: res.sentry,
      error: 'An unexpected error happened'
    })
  }
})

module.exports = app
