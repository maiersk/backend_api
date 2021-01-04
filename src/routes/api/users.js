import Router from 'koa-router'

const users = new Router()

users.get('/', async (ctx, next) => {
  ctx.body = 'users'
})

users.get('/:id', async (ctx, next) => {
  const id = ctx.params.id
  ctx.body = `users id: ${id}`
})

users.delete('/', async (ctx, next) => {
  ctx.body = 'delete'
})

module.exports = users
