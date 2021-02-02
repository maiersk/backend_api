import Router from 'koa-router'
import oauth from '../../middlewares/oauth_role'
import { err, msg, data } from '../../lib/res_msg'
import User from '../../models/user'

const users = new Router()
users.prefix('/users')

users.get('/', async (ctx, next) => {
  try {
    const { page = 0, count = 10 } = ctx.query
    if (page < 0 || count < 0) { throw new Error('negative number') }
    const [_users, total] = await Promise.all([
      User.findAll({
        raw: true,
        limit: count,
        offset: page !== 0 ? page * count : page
      }),
      User.findAndCountAll({})
    ])

    ctx.body = data(_users, { page: +page, total: total.count })
  } catch (error) {
    ctx.body = err(error.message)
  }
})

users.get('/:id', async (ctx, next) => {
  const id = ctx.params.id

  try {
    const user = await User.findOne({
      where: { id }
    })
    if (!user) { throw new Error('not find') }
    ctx.body = data(user)
  } catch (error) {
    ctx.body = err(error.message)
  }
})

users.post('/', oauth(), async (ctx, next) => {
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

users.delete('/:id', oauth(), async (ctx, next) => {
  const id = ctx.params.id

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
