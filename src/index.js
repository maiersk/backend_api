import Koa from 'koa'
import { session_cfg } from './config'
import bodyParser from 'koa-bodyparser'
import router from './routes/index'
import session from 'koa-session'
import cors from '@koa/cors'

const app = new Koa()

app.use(bodyParser())
  .use(cors())
  .use(session(session_cfg, app))
  .use(router.routes())

module.exports = app
