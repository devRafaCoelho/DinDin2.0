const validateRequest = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body)
    next()
  } catch (error) {
    const errorsMap = error?.details.reduce((previousValue, currentValue) => {
      return {
        ...previousValue,
        [currentValue.context.key]: currentValue.message
      }
    }, {})

    return res.status(400).json({ error: errorsMap })
  }
}

module.exports = { validateRequest }
