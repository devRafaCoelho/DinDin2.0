const { knex } = require('../config/db')
const { formatedValue } = require('../utils/format')

const registerTransaction = async (req, res) => {
  const { type, value, date, description, categorie_id } = req.body

  const data = {
    type,
    value,
    date,
    description,
    categorie_id,
    user_id: req.user.id
  }

  try {
    if (!type || (type !== 'entrada' && type !== 'saida')) {
      return res.status(400).json({
        error: {
          type: 'O campo tipo é obrigatório e deve ser definido como entrada ou saída.'
        }
      })
    }

    await knex('transactions').insert(data).returning('*')

    return res.status(201).json({ message: 'Transação cadastrada com sucesso!' })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = {
  registerTransaction
}
