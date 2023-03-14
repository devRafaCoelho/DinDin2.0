const jwt = require('jsonwebtoken')
const { knex } = require('../config/db')

const validateAuthentication = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) return res.status(401).json({ message: 'Não autorizado' })

  const token = authorization.substring(7).trim()

  try {
    const { id } = jwt.verify(token, process.env.DB_PASSWORD)

    const loggedUser = await knex('users').where({ id }).first()
    if (!loggedUser) return res.status(401).json({ message: 'Não autorizado' })

    const { password: _, ...userData } = loggedUser
    req.user = userData

    next()
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = { validateAuthentication }
