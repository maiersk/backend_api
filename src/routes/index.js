import fs from 'fs'
import path from 'path'
import Router from 'koa-router'
import { err, msg } from '../lib/res_msg'

const router = new Router()

router.get('/', async (ctx, next) => {
  const user = ctx.session.user

  ctx.body = `
    <h1>Hello${user?.name ?? ''}</h1>
  `
})

router.get('/signout', async (ctx, next) => {
  if (ctx.session.user) {
    ctx.session.user = null
    ctx.body = msg('signout succ')
  } else {
    ctx.body = err('no signin')
  }
})

const useRoutes = (dirname) => {
  const routes = fs.readdirSync(dirname)

  routes.forEach((route) => {
    const routePath = path.join(dirname, route)

    const stat = fs.lstatSync(routePath)
    if (stat.isDirectory()) {
      useRoutes(routePath)
    } else {
      const module = require(routePath)
      router.use(
        module.routes(),
        router.allowedMethods()
      )
    }
  })
}
useRoutes(path.join(__dirname, '/api'))

export default router
