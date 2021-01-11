import Router from 'koa-router'
import Post from '../../models/post'
import { msg, err, data } from '../../lib/res_msg'

const posts = new Router()
posts.prefix('/posts')

posts.get('/', async (ctx, next) => {
  const posts = await Post.findAll({ raw: true })
  ctx.body = data(posts)
})

posts.get('/:id', async (ctx, next) => {
  const postId = ctx.params.id
  const post = await Post.findOne({ where: postId })
  ctx.body = data(post)
})

posts.post('/', async (ctx, next) => {
  const userId = ctx.session.userid
  const { title, tags, content } = ctx.request.body

  try {
    if (!userId) { throw new Error('no login') }

    const post = await Post.build({
      title,
      userId,
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
  const userId = ctx.session.userId
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
  const postId = ctx.params.id

  try {
    await Post.destroy({
      where: { id: postId }
    })
    ctx.body = msg('deleted')
  } catch (error) {
    ctx.body = err(error.message)
  }
})

module.exports = posts
