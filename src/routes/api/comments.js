import Router from 'koa-router'
import { Comment, User, Reply } from '../../models'
import { data, err, msg } from '../../lib/res_msg'
import oauth from '../../middlewares/oauth_role'

const comments = new Router()
comments.prefix('/comments')

comments.get('/', async (ctx, next) => {
  const { page = 0, count = 10, postId } = ctx.query

  try {
    if (page < 0 || count < 0) { throw new Error('negative number') }

    let _comment = await Comment.findAndCountAll({
      where: postId ? { postId } : {},
      include: [
        { model: User },
        { model: Reply, include: [{ model: User }] }
      ],
      limit: +count,
      offset: page !== 0 ? page * +count : page
    })

    ctx.body = data(_comment.rows, {
      page: +page,
      total: _comment.count,
      total_pages: Math.floor((_comment.count + +count - 1) / +count)
    })
  } catch (error) {
    ctx.body = err(error.message)
  }
})

comments.post('/', oauth(), async (ctx, next) => {
  const userId = ctx.session?.user?.id ?? false
  const { postId, content } = ctx.request.body

  try {
    const comment = await Comment.create({
      userId,
      postId,
      content
    })

    ctx.body = data(comment)
  } catch (error) {
    ctx.body = err(error.message)
  }
})

comments.post('/reply', oauth(), async (ctx, next) => {
  const userId = ctx.session?.user?.id ?? false
  const { postId, commentId, content } = ctx.request.body

  try {
    const reply = await Reply.create({
      userId,
      postId,
      commentId,
      content
    })

    ctx.body = data(reply)
  } catch (error) {
    ctx.body = err(error.message)
  }
})

comments.put('/:id', oauth(), async (ctx, next) => {
  const userId = ctx.session?.user?.id ?? false
  const id = ctx.params.id
  const { content } = ctx.request.body

  try {
    const comment = await Comment.findOne({
      where: { id }
    })
    if (comment.userId !== userId) {
      throw new Error('you are not owner')
    }
    comment.content = content

    await comment.save()
  } catch (error) {
    ctx.body = err(error.message)
  }
})

comments.delete('/:id', oauth(), async (ctx, next) => {
  const id = ctx.params.id

  try {
    const comment = await Comment.findByPk(id)

    if (comment) {
      await Comment.destroy({
        where: { id }
      })
      ctx.body = msg('deleted')
    } else {
      throw new Error('not find')
    }
  } catch (error) {
    ctx.body = err(error.message)
  }
})

comments.delete('/reply/:id', oauth(), async (ctx, next) => {
  const id = ctx.params.id

  try {
    const reply = await Reply.findByPk(id)

    if (reply) {
      await reply.destroy({
        where: { id }
      })
      ctx.body = msg('deleted')
    } else {
      throw new Error('not find')
    }

    ctx.body = data(reply)
  } catch (error) {
    ctx.body = err(error.message)
  }
})

module.exports = comments
