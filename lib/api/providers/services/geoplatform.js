const got = require('../../../got')

const {
  GEOPLATFORM_URL = 'http://localhost:5001/api/geogw'
} = process.env

async function getFeatureType(serviceId, featureType) {
  try {
    const {body} = await got(`${GEOPLATFORM_URL}/services/${serviceId}/feature-types/${featureType}`, {
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
  getFeatureType
}
