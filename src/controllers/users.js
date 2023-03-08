const { knex } = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const isUser = await knex('users').where({ email }).first()
    if (isUser) return res.status(400).json({ error: { email: 'E-mail já cadastrado' } })

    const encryptedPassword = await bcrypt.hash(password, 10)

    const data = {
      name,
      email,
      password: encryptedPassword
    }

    const registeredUser = await knex('users').insert(data).returning('*')

    const { password: _, ...userData } = registeredUser[0]

    return res.status(201).json(userData)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = {
  registerUser
}
