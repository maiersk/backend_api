import Router from 'koa-router'
import Post from '../../models/post'
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
      raw: true,
      limit: +count,
      offset: page !== 0 ? page * +count : page
    })

    // const _tags = await Tag.findAll({
    //   where: {
    //     id: _posts.rows.tags.length ? { [Op.in]: _posts.rows.tags } : {}
    //   },
    //   raw: true
    // })
    console.log('')
    // _posts.rows.tags = _tags

    ctx.body = data(_posts.rows, {
      page: +page,
      total: _posts.count,
      total_pages: (_posts.count + +count - 1) / +count
    })
  } catch (error) {
    ctx.body = err(error.message)
  }
})

posts.get('/:id', async (ctx, next) => {
  const id = ctx.params.id

  try {
    const post = await Post.findOne({ where: { id } })
    if (post) {
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
  const { title, tags, content } = ctx.request.body

  try {
    if (!userId) { throw new Error('no login') }

    const post = await Post.build({
      title,
      authorId: userId,
      tags,
      content
    })
    await post.save()
    ctx.body = data(post)
  } catch (error) {
    ctx.body = err(error.message)
  }
})

posts.put('/:id', async (ctx, next) => {
  const userId = ctx.session.user.id
  const postId = ctx.params.id
  const { title, tags, content } = ctx.request.body

  try {
    const post = await Post.findOne({
      where: { id: postId }
    })
    if (post.authorId !== userId) {
      throw new Error('you are not author')
    }
    await Post.update({
      title, tags, content
    }, {
      where: { id: postId }
    })

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
