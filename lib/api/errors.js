class HttpError extends Error {
  constructor(message) {
    super(message)

    this.name = 'HttpError'
  }

  toJSON() {
    return {
      code: this.statusCode,
      error: this.message
    }
  }
}

class Http400 extends HttpError {
  constructor(message) {
    super(message || 'Bad Request')

    this.name = 'Http400'
    this.statusCode = 400
  }
}

class Http404 extends HttpError {
  constructor(message) {
    super(message || 'The requested resource was not found')

    this.name = 'Http404'
    this.statusCode = 404
  }
}

class Http500 extends HttpError {
  constructor(message) {
    super(message || 'Internal server error')

    this.name = 'Http500'
    this.statusCode = 500
  }
}

module.exports = {
  Http400,
  Http404,
  Http500
}
