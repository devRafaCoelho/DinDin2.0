const { registerTransaction } = require('./controllers/transactions')
const { registerUser, login, detailUser, updateUser } = require('./controllers/users')
const { validateAuthentication } = require('./middlewares/validateAuthentication')
const { validateRequest } = require('./middlewares/validateRequest')
const {
  schemaUserRegister,
  schemaUserLogin,
  schemaUpdateUser,
  schemaTransaction
} = require('./schemas/schemas')

const routes = require('express')()

routes.post('/register', validateRequest(schemaUserRegister), registerUser)
routes.post('/login', validateRequest(schemaUserLogin), login)

routes.use(validateAuthentication)

routes.get('/user', detailUser)
routes.put('/user', validateRequest(schemaUpdateUser), updateUser)

routes.post('/transaction', validateRequest(schemaTransaction), registerTransaction)

module.exports = { routes }
