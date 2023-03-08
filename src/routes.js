const { registerUser } = require('./controllers/users')
const { validateRequest } = require('./middlewares/validateRequest')
const { schemaUserRegister } = require('./schemas/schemas')

const routes = require('express')()

routes.post('/register', validateRequest(schemaUserRegister), registerUser)

module.exports = { routes }
