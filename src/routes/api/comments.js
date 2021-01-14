import Router from 'koa-router'
import Comment from '../../models/Comment'
import { data, err, msg } from '../../lib/res_msg'

const comments = new Router()
comments.prefix('/comments')

comments.get('/', async (ctx, next) => {
  const comments = await Comment.findAll({ raw: true })
  ctx.body = data(comments)
})

comments.get('/:userId', async (ctx, next) => {
  const id = ctx.params.userId
  if (!id) { return }

  const comment = await Comment.findAll({ where: { id } })
  if (comment) {
    ctx.body = data(comment)
  } else {
    ctx.body = err('not find')
  }
})

comments.post('/', async (ctx, next) => {
  const userid = ctx.session?.user?.userId
  const { content } = ctx.request.body

  try {
    const comment = await Comment.create({
      userid,
      content
    })

    ctx.body = data(comment)
  } catch (error) {
    ctx.body = err(err.message)
  }
})

comments.put('/:id', async (ctx, next) => {
  const id = ctx.session.userid
  const content = ctx.request.body

  try {
    const comment = await Comment.findOne({
      where: { id }
    })
    if (!comment) {
      throw new Error('you are not owner')
    }
    await Comment.update({
      content
    }, {
      where: { id }
    })
  } catch (error) {
    ctx.body = err(error.message)
  }
})

comments.delete('/:id', async (ctx, next) => {
  const id = ctx.params.id

  try {
    await Comment.destroy({
      where: { id }
    })
    ctx.body = msg('deleted')
  } catch (error) {
    ctx.body = err(error.message)
  }
})

module.exports = comments
