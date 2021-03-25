const Joi = require('joi')

const registrationSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(4).max(1024).required(),
  confirmPassword: Joi.string().min(4).max(1024).required(),
})
const loginSchema = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(4).max(1024).required(),
})

module.exports = {
  registrationSchema,
  loginSchema,
}
