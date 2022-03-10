const Router = require('koa-router')
const router = new Router()
const Movie = require('../models/movie')
const {
  movieSchema,
  movieUpdateSchema,
  movieHeaderSchema,
} = require('../schemas/movie')

/*
1) Buscador de películas:
Método GET
- El valor a buscar debe ir en la URL de la API
- Adicionalmente puede ir un header opcional que contenga 
el año de la película.

- Almacenar en una BD Mongo, la siguiente info:
    Title
    Year
    Released
    Genre
    Director
    Actors
    Plot
    Ratings
- El registro de la película solo debe estar una vez en la BD.
- Devolver la información almacenada en la BD.
*/
router.get('/movies/search', async (ctx) => {
  const pageSize = 5
  const pageNumber = ctx.request.headers['x-movie-page'] || 1
  const movieYear = ctx.request.headers['x-movie-year']
  const { title } = ctx.query

  // validate headers with joi
  const validYear = movieHeaderSchema.validate({ movieYear: movieYear })
  const validTitle = movieSchema.validate({ Title: title })
  if (validYear?.error) ctx.throw(400, validYear.error.message)
  if (validTitle?.error) ctx.throw(400, validTitle.error.message)

  const filter = {}
  if (title) filter.Title = { $regex: title, $options: 'i' }
  if (movieYear) filter.Year = movieYear

  const result = await Movie.find(filter)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)

  if (!result) ctx.throw(204, 'No movies found')

  ctx.set('x-movie-page', pageNumber)
  ctx.body = result
})

/*
2) Obtener todas las películas:
Método GET
- Se deben devolver todas las películas que se han guardado en la BD.
- Si hay más de 5 películas guardadas en BD, se deben paginar los resultados de 5 en 5
- El número de página debe ir por header.
*/
router.get('/movies', async (ctx) => {
  const pageSize = 5
  const pageNumber = ctx.request.headers['x-movie-page'] || 1
  const movieYear = ctx.request.headers['x-movie-year']

  // validate headers with joi
  const { values, error } = movieHeaderSchema.validate({
    pageNumber,
    movieYear,
  })
  if (error) ctx.throw(400, error.message)

  const result = await Movie.find(
    movieYear && {
      Year: movieYear,
    },
  )
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)

  if (!result) ctx.throw(204, 'No movies found')

  ctx.set('x-movie-page', pageNumber)
  ctx.body = result
})

/*
3) Buscar y reemplazar:
Método POST
- Que reciba en el BODY un object como por ej: 
{
  movie: star wars, 
  find: jedi, 
  replace: CLM Dev 
}
- Buscar dentro de la BD y obtener el campo PLOT del registro
- Al string del plot obtenido buscar la palabra enviada en el Body (find) y 
reemplazar todas sus ocurrencias por el campo enviado en el body (replace)
- Devolver el string con las modificaciones del punto anterior
*/
router.post('/movies', async (ctx) => {
  // validate request with joi
  const { values, error } = movieUpdateSchema.validate(ctx.request.body)
  if (error) ctx.throw(400, error.message)

  const { movie, find: searchValue, replace: replaceValue } = ctx.request.body
  const result = await Movie.findOne({
    Title: { $regex: movie, $options: 'i' },
  })

  if (!result) {
    ctx.throw(404, 'Movie not found')
  }

  if (ctx.request.body?.replace) {
    result.Plot = result.Plot.replace(searchValue, replaceValue)
    result.save()
  }
  ctx.body = result.Plot
})

router.get('/movies/:id', async (ctx) => {
  const { id: _id } = ctx.params
  const result = await Movie.findById({ _id })
  if (!result) ctx.throw(404, 'Movie not found')
  ctx.body = result
})

module.exports = router
