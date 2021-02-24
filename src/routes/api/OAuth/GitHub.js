import axios from 'axios'
import Router from 'koa-router'
import { User } from '../../../models'
import { site, oauth } from '../../../config'
import { err } from '../../../lib/res_msg'

const gitHub = new Router()
const routerPath = '/oauth/github'
gitHub.prefix(routerPath)

gitHub.get('/', async (ctx, next) => {
  ctx.body = 'https://github.com/login/oauth/authorize?' +
    `client_id=${oauth.github.clientID}&redirect_uri=` +
    `http://${site.domain}:${site.port}${routerPath}/redirect`
})

gitHub.get('/redirect', async (ctx, next) => {
  const codeTemp = ctx.request.query.code
  try {
    if (ctx.session.user) { throw new Error('logined') }

    const reqToken = await axios({
      method: 'post',
      url: 'https://github.com/login/oauth/access_token?' +
        `client_id=${oauth.github.clientID}&` +
        `client_secret=${oauth.github.clientSecret}&` +
        `code=${codeTemp}`,
      headers: {
        accept: 'application/json'
      }
    })

    const resToken = reqToken.data?.access_token
    if (!resToken) { throw new Error('null token') }

    const result = await axios({
      method: 'get',
      url: 'https://api.github.com/user',
      headers: {
        Authorization: `Bearer ${resToken}`
      }
    })

    const githubUser = result.data
    console.log(User)
    let user = await User.findOne({
      where: { oauthId: '' + githubUser.id }
    })

    if (!user) {
      user = await User.create({
        name: githubUser.name,
        oauthType: 'G',
        oauthId: '' + githubUser.id,
        avatar: githubUser.avatar_url,
        url: githubUser.html_url
      })
    } else {
      user.name = githubUser.name
      user.avatar = githubUser.avatar_url
      user.url = githubUser.html_url
      await user.save()
    }

    ctx.session.token = resToken
    ctx.session.user = user

    console.log(user)
  } catch (error) {
    console.log(err(error.message))
  }
  ctx.redirect(`http://${site.frontend.domain}:${site.frontend.port}`)
})

module.exports = gitHub
