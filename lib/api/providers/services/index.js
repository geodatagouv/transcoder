const {Router} = require('express')
const splitOnFirst = require('split-on-first')

const am = require('../../middlewares/async')
const ogr2ogr = require('../../middlewares/ogr2ogr')
const {Http404} = require('../../errors')

const {getFeatureType} = require('./geoplatform')

const router = new Router()

function getFeatureName(name) {
  const parts = splitOnFirst(name, ':')
  return parts[1] || parts[0]
}

router.get(
  '/:serviceId/feature-types/:name',
  am(async (req, res, next) => {
    const featureType = await getFeatureType(req.params.serviceId, req.params.name)
    if (!featureType) {
      throw new Http404(`Feature type ${req.params.name} was not found on service with id ${req.params.serviceId}`)
    }

    const downloader = ogr2ogr.downloadDataset(featureType.serviceLocation, {
      type: 'wfs',
      name: getFeatureName(featureType.name)
    })

    downloader(req, res, next)
  })
)

module.exports = router
