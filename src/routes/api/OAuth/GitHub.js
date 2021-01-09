import axios from 'axios'
import Router from 'koa-router'
import { oauth } from '../../../config'

const gitHub = new Router()
gitHub.prefix('/oauth/github')

gitHub.get('/', async (ctx, next) => {
  ctx.body = `https://github.com/login/oauth/authorize?client_id=${oauth.github.clientID}&redirect_uri=http://localhost:3000/oauth/github/redirect`
})

gitHub.get('/redirect', async (ctx, next) => {
  const temp_code = ctx.request.query.code

  const req_token = await axios({
    method: 'post',
    url: 'https://github.com/login/oauth/access_token?' +
      `client_id=${oauth.github.clientID}&` +
      `client_secret=${oauth.github.clientSecret}&` +
      `code=${temp_code}`,
    headers: {
      accept: 'application/json'
    }
  })

  const res_token = req_token.data.access_token

  // const result = await axios({
  //   method: 'get',
  //   url: 'https://api.github.com/user',
  //   headers: {
  //     accept: 'application/json',
  //     Authorization: `token ${res_token}`
  //   }
  // })

  ctx.body = res_token
})

module.exports = gitHub
