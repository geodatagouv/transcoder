const {Router} = require('express')
const splitOnFirst = require('split-on-first')

const mongo = require('../../../mongo')

const am = require('../../middlewares/async')
const ogr2ogr = require('../../middlewares/ogr2ogr')
const {Http404} = require('../../errors')

const router = new Router()

function getFeatureName(name) {
  const parts = splitOnFirst(name, ':')
  return parts[1] || parts[0]
}

router.get(
  '/:serviceId/feature-types/:name',
  am(async (req, res, next) => {
    let serviceId

    try {
      serviceId = new mongo.ObjectID(req.params.serviceId)
    } catch (error) {
      throw new Http404(`The service ${req.params.serviceId} was not found`)
    }

    const [
      service,
      featureType
    ] = await Promise.all([
      await mongo.db.collection('services').findOne({
        _id: serviceId
      }, {
        projection: {
          location: 1
        }
      }),

      await mongo.db.collection('featuretypes').findOne({
        service: serviceId,
        name: req.params.name
      }, {
        projection: {
          name: 1
        }
      })
    ])

    if (!service) {
      throw new Http404(`Service with id ${req.params.serviceId} was not found`)
    }

    if (!featureType) {
      throw new Http404(`Feature type ${req.params.name} was not found`)
    }

    const downloader = ogr2ogr.downloadDataset(service.location, {
      type: 'wfs',
      name: getFeatureName(featureType.name)
    })

    downloader(req, res, next)
  })
)

module.exports = router
