import Router from 'koa-router'
import { err, msg, data } from '../../lib/res_msg'
import User from '../../models/user'

const users = new Router()
users.prefix('/users')

users.get('/', async (ctx, next) => {
  const users = await User.findAll({ raw: true })
  ctx.body = data(users)
})

users.get('/:id', async (ctx, next) => {
  const id = ctx.params.id

  try {
    const user = await User.findOne({
      where: { id }
    })
    if (!user) { throw new Error('not fond users') }
    ctx.body = data(user, msg('find one'))
  } catch (error) {
    ctx.body = err(error.message)
  }
})

users.post('/', async (ctx, next) => {
  const { name } = ctx.request.body

  try {
    const user = await User.build({
      name: name.trim()
    }, { raw: true })

    await user.save()
    ctx.body = data(user, msg('create succ'))
  } catch (error) {
    console.log(error)
    ctx.body = err(error.message)
  }
})

users.put('/', async (ctx, next) => {
  const id = ctx.session.userid
  const avatar = ctx.request.body
  try {
    const user = await User.update({ avatar }, {
      where: { id }
    })
    if (user) {
      ctx.body = msg('update user')
    }
  } catch (error) {
    ctx.body = err(error.message)
  }
})

users.delete('/:id', async (ctx, next) => {
  const id = ctx.params.id
  const user = ctx.session.user

  try {
    if (user) {
      const user = await User.findByPk(id, { raw: true })
      await User.destroy({
        where: { id }
      })
      console.log(user)
      ctx.body = { succ: 'deleted' }
    } else {
      ctx.body = err('not find')
    }
  } catch (error) {
    ctx.body = err(error.message)
  }
})

module.exports = users
