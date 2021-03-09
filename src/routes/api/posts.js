import Router from 'koa-router'
import { Post, Tag, Comment, User } from '../../models'
import { msg, err, data } from '../../lib/res_msg'
import { Op } from 'sequelize'

const posts = new Router()
posts.prefix('/posts')

posts.get('/', async (ctx, next) => {
  const { page = 0, count = 10, query } = ctx.query

  try {
    if (page < 0 || count < 0) { throw new Error('negative number') }

    let _posts = await Post.findAndCountAll({
      where: query ? { title: { [Op.like]: `%${query}%` } } : {},
      include: [
        { model: Tag },
        { model: Comment },
        { model: User }
      ],
      limit: +count,
      offset: page !== 0 ? page * +count : page
    })

    ctx.body = data(_posts.rows, {
      page: +page,
      total: _posts.count,
      total_pages: Math.floor((_posts.count + +count - 1) / +count)
    })
  } catch (error) {
    ctx.body = err(error.message)
  }
})

posts.get('/:id', async (ctx, next) => {
  const id = ctx.params.id
  const { view } = ctx.request.query

  try {
    const post = await Post.findOne({
      where: { id },
      include: [
        { model: Tag },
        { model: Comment }
      ]
    })
    if (post) {
      if (view === '1') {
        post.viewCount += 1
        await post.save()
      }

      ctx.body = data(post)
    } else {
      throw new Error('not find')
    }
  } catch (error) {
    ctx.body = err(error.message)
  }
})

posts.post('/', async (ctx, next) => {
  const userId = ctx.session.user?.id ?? false
  const { title, tags = [], content } = ctx.request.body

  try {
    if (!userId) { throw new Error('no login') }

    const post = await Post.create({
      title,
      userId,
      content,
      tags
    }, {})
    const _tags = await Tag.findAll({
      where: { id: tags }
    })

    await post.setTags(_tags)

    ctx.body = data(post)
  } catch (error) {
    ctx.body = err(error.message)
  }
})

posts.put('/:id', async (ctx, next) => {
  const userId = ctx.session.user?.id ?? false
  const postId = ctx.params.id
  const { title, tags = [], content } = ctx.request.body

  try {
    if (!userId) { throw new Error('no login') }

    const post = await Post.findOne({
      where: { id: postId }
    })

    if (post.userId !== userId) {
      throw new Error('you are not author')
    }

    const _tags = await Tag.findAll({
      where: { id: tags }
    })

    await Post.update({
      title, tags, content
    }, {
      where: { id: postId }
    })
    await post.setTags(_tags)

    ctx.body = msg('update succ')
  } catch (error) {
    ctx.body = err(error.message)
  }
})

posts.delete('/:id', async (ctx, next) => {
  const id = ctx.params.id

  try {
    await Post.destroy({
      where: { id }
    })
    ctx.body = msg('deleted')
  } catch (error) {
    ctx.body = err(error.message)
  }
})

module.exports = posts
