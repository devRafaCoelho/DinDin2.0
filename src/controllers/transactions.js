const { knex } = require('../config/db')
const { formatedValue, formatedDate } = require('../utils/format')

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

const detailTransaction = async (req, res) => {
  const { id } = req.params

  try {
    const transaction = await knex('transactions')
      .select(
        'transactions.id',
        'transactions.description',
        'transactions.value',
        'transactions.date',
        'transactions.categorie_id',
        'transactions.user_id',
        'transactions.type'
      )
      .where('transactions.id', id)
      .first()

    if (!transaction) {
      return res.status(404).json({ message: 'Transação não encontrada' })
    }

    const data = {
      transactionId: transaction.id,
      description: transaction.description,
      value: formatedValue(transaction.value),
      date: formatedDate(transaction.date),
      categorie_id: transaction.categorie_id,
      user_id: transaction.user_id,
      type: transaction.type
    }

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const updateTransaction = async (req, res) => {
  const { id } = req.params
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

    await knex('transactions').where({ id }).update(data)
    return res.status(204).send()
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = {
  registerTransaction,
  detailTransaction,
  updateTransaction
}
