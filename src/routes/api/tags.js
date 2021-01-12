import Router from 'koa-router'
import Tag from '../../models/Tag'
import { data, msg, err } from '../../lib/res_msg'

const tags = new Router()
tags.prefix('/tags')

tags.get('/', async (ctx, next) => {
  const tags = await Tag.findAll({ raw: true })
  ctx.body = data(tags)
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

tags.post('/', async (ctx, next) => {
  const { name, color } = ctx.request.body

  try {
    const tag = await Tag.build({
      name, color
    })
    await tag.save()

    ctx.body = msg('succ')
  } catch (error) {
    ctx.body = err(error.message)
  }
})

tags.put('/:id', async (ctx, next) => {
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

tags.delete('/:id', async (ctx, next) => {
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
