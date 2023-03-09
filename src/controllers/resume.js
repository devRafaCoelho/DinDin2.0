const { knex } = require('../config/db')
const { formatedValue } = require('../utils/format')

async function resume(req, res) {
  try {
    const [totalInpus, totalOutputs] = await Promise.all([
      knex('transactions').where('type', '=', 'entrada').sum('value'),
      knex('transactions').where('type', '=', 'saida').sum('value')
    ])

    const data = {
      Imputs: formatedValue(totalInpus[0].sum),
      Outputs: formatedValue(totalOutputs[0].sum),
      Balance: formatedValue(totalInpus[0].sum - totalOutputs[0].sum)
    }

    return res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao buscar dados das transações')
  }
}

module.exports = { resume }
