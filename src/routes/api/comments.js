import Router from 'koa-router'
import { Comment, User } from '../../models'
import { data, err, msg } from '../../lib/res_msg'
import { Op } from 'sequelize'

const comments = new Router()
comments.prefix('/comments')

comments.get('/', async (ctx, next) => {
  const { page = 0, count = 10, query } = ctx.query

  try {
    if (page < 0 || count < 0) { throw new Error('negative number') }

    let _comment = await Comment.findAndCountAll({
      where: query ? { title: { [Op.like]: `%${query}%` } } : {},
      include: [
        { model: User }
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

comments.post('/', async (ctx, next) => {
  const userId = ctx.session?.user?.id ?? false
  const { postId, content } = ctx.request.body

  try {
    if (!userId) { throw new Error('no login') }

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

comments.put('/:id', async (ctx, next) => {
  const userId = ctx.session?.user?.id ?? false
  const id = ctx.params.id
  const { content } = ctx.request.body

  try {
    if (!userId) { throw new Error('no login') }

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

comments.delete('/:id', async (ctx, next) => {
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

module.exports = comments
