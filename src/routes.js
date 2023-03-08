const { registerUser, login } = require('./controllers/users')
const { validateRequest } = require('./middlewares/validateRequest')
const { schemaUserRegister, schemaUserLogin } = require('./schemas/schemas')

const routes = require('express')()

routes.post('/register', validateRequest(schemaUserRegister), registerUser)
routes.post('/login', validateRequest(schemaUserLogin), login)

module.exports = { routes }
