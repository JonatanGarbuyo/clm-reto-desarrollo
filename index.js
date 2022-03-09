//// Initializing variables ////
require('dotenv').config()

//// Connecting to the database ////
const mongoose = require('mongoose')
const db = mongoose.connection
const DB_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
mongoose.connect(process.env.DBHOST, DB_OPTIONS)

db.on('error', (error) => console.log('Error, DB Not Connected', error))
db.on('connected', () => console.log('Connected to MongoDB'))
db.on('disconnected', () => console.log('MongoDB is disconnected'))
db.on('open', () => console.log('Connection made.'))

//// Creating server ////
const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const router = require('./routes/index')

// logger //
app.use(async (ctx, next) => {
  // console.log(`INCOMING: Method ${ctx.method} - URL ${ctx.url} `)
  await next()
  // console.log(`OUTGOING: CTX ${ctx.toJSON} - URL ${ctx.url} `)
})

//// Middelwares ////
app.use(bodyParser())
app.use(router.routes())

app.use(async (ctx) => {
  ctx.body = '404 Not Found'
})

app.listen(3333, () => console.log('Server started on port 3333'))
