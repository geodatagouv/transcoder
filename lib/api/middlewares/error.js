const {HttpError, Http500} = require('../errors')

module.exports = (error, req, res, next) => {
  if (error instanceof HttpError) {
    next(error)
  } else {
    next(new Http500('Failed transcoding dataset'))
  }
}
