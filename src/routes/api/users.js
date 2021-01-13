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
    ctx.body = data(user)
  } catch (error) {
    ctx.body = err(error.message)
  }
})

users.post('/', async (ctx, next) => {
  const {
    name,
    oauthType,
    oauthId,
    avatar
  } = ctx.request.body

  try {
    if (!name || !oauthId) {
      throw new Error('name or oauthid cannot ne null')
    }

    const user = await User.findOrCreate({
      where: { oauthId },
      defaults: {
        name,
        oauthType,
        oauthId,
        avatar
      }
    })

    ctx.body = data(user)
  } catch (error) {
    console.log(error)
    ctx.body = err(error.message)
  }
})

users.put('/:id', async (ctx, next) => {
  const id = ctx.params.id
  const {
    name,
    oauthType,
    oauthId,
    avatar
  } = ctx.request.body

  try {
    let user = await User.findByPk(id, { raw: true })

    if (user) {
      user = await User.update({
        name,
        oauthType,
        oauthId,
        avatar
      }, {
        where: { id }
      })
      ctx.body = msg('update user')
    } else {
      throw new Error('not find')
    }
  } catch (error) {
    ctx.body = err(error.message)
  }
})

users.delete('/:id', async (ctx, next) => {
  const id = ctx.params.id
  // const opUser = ctx.session.user

  try {
    const user = await User.findByPk(id, { raw: true })

    if (user) {
      await User.destroy({
        where: { id }
      })
      console.log(user)

      ctx.body = { succ: 'deleted' }
    } else {
      throw new Error('not find')
    }
  } catch (error) {
    ctx.body = err(error.message)
  }
})

module.exports = users
