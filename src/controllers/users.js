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

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await knex('users').where({ email }).first()
    if (!user) return res.status(400).json({ error: { email: 'E-mail inválido' } })

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).json({ error: { password: 'Senha inválida' } })

    const token = jwt.sign({ id: user.id }, '123456', {
      expiresIn: '1h'
    })

    const { password: _, ...userData } = user

    return res.status(201).json({ user: userData, token })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const detailUser = async (req, res) => {
  const userData = {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  }

  return res.status(200).json(userData)
}

const updateUser = async (req, res) => {
  const { name, email, password, newPassword } = req.body
  const { id, email: userEmail } = req.user

  const encryptedPassword = await bcrypt.hash(password, 10)
  const encryptedNewPassword = newPassword ? await bcrypt.hash(newPassword, 10) : null

  const data = {
    name,
    email,
    password: encryptedNewPassword ? encryptedNewPassword : encryptedPassword
  }

  try {
    const user = await knex('users').where({ id }).first()

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).json({ error: { password: 'Senha inválida' } })

    const isEmail = userEmail !== email ? await knex('users').where({ email }).first() : null
    if (isEmail) return res.status(400).json({ error: { email: 'E-mail já cadastrado' } })

    await knex('users').where({ id }).update(data)

    return res.status(204).send()
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = {
  registerUser,
  login,
  detailUser,
  updateUser
}
