import Koa from 'koa'
import { router, bodyParser } from './routes/index'

const app = new Koa()

app.use(bodyParser())
  .use(router.routes())

module.exports = app
