const routes = require('express')()

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'api ok' })
})

module.exports = { routes }
