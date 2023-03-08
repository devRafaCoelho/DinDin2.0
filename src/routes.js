const { registerUser, login, detailUser, updateUser } = require('./controllers/users')
const { validateAuthentication } = require('./middlewares/validateAuthentication')
const { validateRequest } = require('./middlewares/validateRequest')
const { schemaUserRegister, schemaUserLogin, schemaUpdateUser } = require('./schemas/schemas')

const routes = require('express')()

routes.post('/register', validateRequest(schemaUserRegister), registerUser)
routes.post('/login', validateRequest(schemaUserLogin), login)

routes.use(validateAuthentication)

routes.get('/user', detailUser)
routes.put('/user', validateRequest(schemaUpdateUser), updateUser)

module.exports = { routes }
