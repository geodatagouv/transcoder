require('dotenv').config()

const mongo = require('./lib/mongo')

async function main() {
  const port = process.env.PORT || 5002
  await mongo.connect()

  mongo.client.on('close', () => {
    process.exit(1)
  })

  require('./lib/api').listen(port, () => {
    console.log('Now listening on port %d', port)
  })
}

main().catch(error => {
  console.error(error)

  process.exit(1)
})
