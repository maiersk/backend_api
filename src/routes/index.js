import fs from 'fs'
import path from 'path'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = `
    <h1>Hello</h1>
  `
})

const useRoutes = (dirname) => {
  const routes = fs.readdirSync(dirname)

  routes.forEach((route) => {
    const routeName = route.replace('.js', '')
    const routePath = path.join(dirname, route)

    const stat = fs.lstatSync(routePath)
    if (routeName !== 'index') {
      if (stat.isDirectory()) {
        useRoutes(routePath)
      } else {
        const module = require(routePath)
        router.use(`/${routeName}`, module.routes(), router.allowedMethods())
      }
    }
  })
}
useRoutes(__dirname)

module.exports = {
  router,
  bodyParser
}
