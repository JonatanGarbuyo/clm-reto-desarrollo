const Joi = require('joi')

const movieSchema = Joi.object({
  Title: Joi.string().min(2).max(255),
  Year: Joi.number(),
})

const movieUpdateSchema = Joi.object({
  movie: Joi.string().min(2).max(255),
  find: Joi.string().min(2).max(255),
  replace: Joi.string().min(2).max(255),
})

const movieHeaderSchema = Joi.object({
  pageNumber: Joi.number(),
  movieYear: Joi.number(),
})

module.exports = { movieSchema, movieUpdateSchema, movieHeaderSchema }
