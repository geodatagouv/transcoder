require('dotenv').config()

async function main() {
  const port = process.env.PORT || 5002

  require('./lib/api').listen(port, () => {
    console.log('Now listening on port %d', port)
  })
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
