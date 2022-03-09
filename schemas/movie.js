const Joi = require('joi')

const movieSchema = Joi.object({
  Title: Joi.string().min(2).max(255),
  Year: Joi.number().min(1900),
})

const movieSearchSchema = Joi.object({
  movie: Joi.string().min(2).max(255),
  find: Joi.string().min(2).max(255),
  replace: Joi.string().min(2).max(255),
})

module.exports = { movieSchema, movieSearchSchema }
