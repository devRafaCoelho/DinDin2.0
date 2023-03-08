const Joi = require('joi')

const schemaUserRegister = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'O nome é obrigatório',
    'string.empty': 'O nome é obrigatório'
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'O campo email deve ser do tipo texto.',
    'string.email': 'O email precisa ser válido',
    'any.required': 'O email é obrigatório',
    'string.empty': 'O email é obrigatório'
  }),
  password: Joi.string().min(5).required().messages({
    'any.required': 'A senha é obrigatória',
    'string.empty': 'A senha é obrigatória',
    'string.min': 'A senha precisa conter, no mínimo, 5 caracteres'
  })
})

module.exports = {
  schemaUserRegister
}
