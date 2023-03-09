const { listCategories } = require('./controllers/categories')
const { resume } = require('./controllers/resume')
const {
  registerTransaction,
  detailTransaction,
  updateTransaction,
  deleteTransaction,
  listTransactions
} = require('./controllers/transactions')
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

routes.get('/categorie', listCategories)

routes.post('/transaction', validateRequest(schemaTransaction), registerTransaction)
routes.get('/transaction/:id', detailTransaction)
routes.put('/transaction/:id', validateRequest(schemaTransaction), updateTransaction)
routes.delete('/transaction/:id', deleteTransaction)
routes.get('/transaction', listTransactions)

routes.get('/resume', resume)

module.exports = { routes }
