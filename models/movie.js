const { Schema, model } = require('mongoose')

const movieSchema = new Schema({
  Title: String,
  Year: Number,
  Released: { type: Date, default: Date.now },
  Genre: String,
  Director: String,
  Actors: [{ name: String }],
  Plot: String,
  Ratings: Number,
})

module.exports = model('Movie', movieSchema)
