import Router from 'koa-router'
import { data, err, msg } from '../../../lib/res_msg'

const oauth = new Router()
oauth.prefix('/oauth')

oauth.get('/', (ctx, next) => {
  if (ctx.session.user) {
    ctx.body = data(ctx.session.user)
  } else {
    ctx.body = err('no signin')
  }
})

oauth.get('/signout', async (ctx, next) => {
  if (ctx.session.user) {
    ctx.session.user = null
    ctx.body = msg('signout succ')
  } else {
    ctx.body = err('no signin')
  }
})

module.exports = oauth
