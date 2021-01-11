import axios from 'axios'
import Router from 'koa-router'
import User from '../../../models/User'
import { site, oauth } from '../../../config'
import { err, data } from '../../../lib/res_msg'

const gitHub = new Router()
const routerPath = '/oauth/github'
gitHub.prefix(routerPath)

gitHub.get('/', async (ctx, next) => {
  ctx.body = data('https://github.com/login/oauth/authorize?' +
    `client_id=${oauth.github.clientID}&redirect_uri=` +
    `http://${site.domain}:${site.port}${routerPath}/redirect`)
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

    const userInfo = result.data
    const user = await User.findOrCreate({
      where: {
        oauthId: resToken
      },
      defaults: {
        name: userInfo.name,
        oauthType: 'G',
        oauthId: resToken,
        avatar: userInfo.avatar_url,
        url: userInfo.html_url
      }
    })

    ctx.session.user = user

    ctx.body = data('login succ')
  } catch (error) {
    ctx.body = err(error.message)
  }
})

module.exports = gitHub
