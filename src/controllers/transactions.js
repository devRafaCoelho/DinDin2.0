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
      id: transaction.id,
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
    const transaction = await knex('transactions').where({ id }).first()
    if (!transaction) return res.status(404).json({ message: 'Transação não encontrada' })

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

const deleteTransaction = async (req, res) => {
  const { id } = req.params

  try {
    const transaction = await knex('transactions').where('transactions.id', id).first()

    if (!transaction) {
      return res.status(404).json({ message: 'Transação não encontrada.' })
    }

    await knex('transactions').where({ id }).del()

    return res.status(204).json({ message: 'Transação deletada com sucesso.' })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

const listTransactions = async (req, res) => {
  const { categorie_id, order } = req.query

  try {
    const transactions = await knex('transactions').select(
      'transactions.id',
      'transactions.description',
      'transactions.value',
      'transactions.date',
      'transactions.categorie_id',
      'transactions.user_id',
      'transactions.type'
    )

    const allTransactions = transactions.map((transaction) => {
      return {
        id: transaction.id,
        description: transaction.description,
        value: formatedValue(transaction.value),
        date: formatedDate(transaction.date),
        categorie_id: transaction.categorie_id,
        user_id: transaction.user_id,
        type: transaction.type
      }
    })

    let filteredTransactions = allTransactions

    if (categorie_id) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.categorie_id.toString() === categorie_id.toString()
      )
    }

    if (order) {
      filteredTransactions.sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)

        if (order === 'asc') {
          return dateA - dateB
        } else if (order === 'desc') {
          return dateB - dateA
        }
      })
    }

    if (filteredTransactions.length === 0) {
      return res.status(400).json({ error: { list: 'Nenhuma transação encontrada' } })
    } else {
      return res.status(200).json(filteredTransactions)
    }
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = {
  registerTransaction,
  detailTransaction,
  updateTransaction,
  deleteTransaction,
  listTransactions
}
