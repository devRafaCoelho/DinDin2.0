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

const schemaUserLogin = Joi.object({
  email: Joi.string().email().required().messages({
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

const schemaUpdateUser = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'O nome é obrigatório',
    'string.empty': 'O nome é obrigatório'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'O email precisa ser válido',
    'any.required': 'O email é obrigatório',
    'string.empty': 'O email é obrigatório'
  }),
  password: Joi.string().min(5).required().messages({
    'any.required': 'A senha é obrigatória',
    'string.empty': 'A senha é obrigatória',
    'string.min': 'A senha precisa conter, no mínimo, 5 caracteres'
  }),
  newPassword: Joi.string().min(5).messages({
    'string.min': 'A senha precisa conter, no mínimo, 5 caracteres'
  })
})

const schemaTransaction = Joi.object({
  type: Joi.string().required().messages({
    'any.required': 'A categoria é obrigatória',
    'string.empty': 'A categoria é obrigatória'
  }),
  value: Joi.number().required().messages({
    'any.required': 'O valor da cobrança é obrigatório',
    'number.base': 'O valor da cobrança precisa ser um número'
  }),
  date: Joi.date().iso().required().messages({
    'date.format': 'Data inválida',
    'any.required': 'A data de vencimento é obrigatória',
    'number.empty': 'O valor da data é obrigatório',
    'number.base': 'O valor da data precisa ser um número'
  }),
  description: Joi.string().max(500).required().messages({
    'string.max': 'A descrição precisa conter, no máximo, 500 caracteres',
    'any.required': 'A descrição é obrigatória',
    'string.empty': 'A descrição é obrigatória'
  }),
  categorie_id: Joi.string().required().messages({
    'any.required': 'A categoria é obrigatória',
    'string.empty': 'A categoria é obrigatória'
  })
})

module.exports = {
  schemaUserRegister,
  schemaUserLogin,
  schemaUpdateUser,
  schemaTransaction
}
