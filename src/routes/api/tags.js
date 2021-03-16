import Router from 'koa-router'
import { Tag } from '../../models'
import { data, msg, err } from '../../lib/res_msg'
import { Op } from 'sequelize'
import oauth from '../../middlewares/oauth_role'

const tags = new Router()
tags.prefix('/tags')

tags.get('/', async (ctx, next) => {
  const { page = 0, count = 10, query } = ctx.query

  try {
    if (page < 0 || count < 0) { throw new Error('negative number') }

    const [_tags, total] = await Promise.all([
      Tag.findAll({
        where: query ? { name: { [Op.like]: `%${query}%` } } : {},
        raw: true,
        limit: +count,
        offset: page !== 0 ? page * +count : page
      }),
      Tag.findAndCountAll({})
    ])

    ctx.body = data(_tags, {
      page: +page,
      total: total.count,
      total_pages: Math.floor((total.count + +count - 1) / +count)
    })
  } catch (error) {
    ctx.body = err(error.message)
  }
})

tags.get('/:id', async (ctx, next) => {
  const id = ctx.params.id

  try {
    const tag = await Tag.findOne({
      where: { id }
    })
    if (tag) {
      ctx.body = data(tag)
    } else {
      throw new Error('not find')
    }
  } catch (error) {
    ctx.body = err(error.message)
  }
})

tags.post('/', oauth(), async (ctx, next) => {
  const { name, color } = ctx.request.body

  try {
    const tag = await Tag.build({
      name, color
    })
    await tag.save()

    ctx.body = data(tag)
  } catch (error) {
    ctx.body = err(error.message)
  }
})

tags.put('/:id', oauth(), async (ctx, next) => {
  const id = ctx.params.id
  const { name, color } = ctx.request.body

  try {
    await Tag.update({
      name, color
    }, {
      where: { id }
    })

    ctx.body = msg('update succ')
  } catch (error) {
    ctx.body = err(error.message)
  }
})

tags.delete('/:id', oauth(), async (ctx, next) => {
  const id = ctx.params.id
  try {
    await Tag.destroy({
      where: { id }
    })
    ctx.body = msg('deleted')
  } catch (error) {
    ctx.body = err(error.message)
  }
})

module.exports = tags
