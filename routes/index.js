const Router = require('koa-router')
const router = new Router()

const movieRouter = require('./movies')

router.get('/', async (ctx) => {
  ctx.body = 'Movies API'
})
router.use(movieRouter.routes())

module.exports = router
