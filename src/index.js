import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from './routes/index'
import session from 'koa-session'
import cors from '@koa/cors'
import { sessionCfg } from './config'

const app = new Koa()

app.keys = sessionCfg.signkeys
app.use(bodyParser())
  .use(cors({
    origin: 'Access-Control-Allow-Origin'
  }))
  .use(session(sessionCfg, app))
  .use(router.routes())

export default app
