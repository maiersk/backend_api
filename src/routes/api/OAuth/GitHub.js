import axios from 'axios'
import Router from 'koa-router'
import { oauth } from '../../../config'
import { err, data } from '../../../lib/res_msg'

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

  try {
    const res_token = req_token.data.access_token
    const base64 = new Buffer.from(res_token).toString('base64') 

    const result = await axios({
      method: 'get',
      url: 'https://api.github.com/user',
      headers: {
        Authorization: `Basic ${base64}`,
      }
    })
  
    ctx.body = data(result.data)
  } catch (error) {
    ctx.body = err(error.message)
  }
})

module.exports = gitHub
