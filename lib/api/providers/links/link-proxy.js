const got = require('../../../got')

const {LINK_PROXY_URL} = process.env

async function getLink(proxyId) {
  try {
    const {body} = await got(`${LINK_PROXY_URL}/${proxyId}`, {
      json: true
    })

    return body
  } catch (error) {
    if (error.statusCode === 404) {
      return null
    }

    throw error
  }
}

module.exports = {
  getLink
}
