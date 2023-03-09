const { knex } = require('../config/db')

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
    if (!type || !['entrada', 'saida'].includes(type)) {
      return res.status(400).json({
        error: {
          type: 'O campo tipo é obrigatório e deve ser definido como entrada ou saída.'
        }
      })
    }

    const categoryExists = await knex('categories').select('*').where('id', categorie_id).first()
    if (!categoryExists) {
      return res.status(400).json({
        error: {
          categorie_id: 'Nenhuma categoria encontrada.'
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
