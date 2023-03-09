const { knex } = require('../config/db')

const listCategories = async (req, res) => {
  try {
    const categories = await knex('categories')

    return res.status(200).json(categories)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = { listCategories }
