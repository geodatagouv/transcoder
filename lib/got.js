const got = require('got')

const pkg = require('../package.json')

module.exports = got.extend({
  headers: {
    'user-agent': `transcoder/${pkg.version} (+https://geo.data.gouv.fr)`
  }
})
