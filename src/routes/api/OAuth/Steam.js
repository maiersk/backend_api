import Router from 'koa-router'
import axios from 'axios'
import buildUrl from '../../../util/buildUrl'
import { site, oauth } from '../../../config/'
import { err, data } from '../../../lib/res_msg'
import User from '../../../models/User'

const steam = new Router()
const routerPath = '/oauth/steam'
steam.prefix(routerPath)

steam.get('/', async (ctx, next) => {
  const realm = `http://${site.domain}:${site.port}`
  const returnPath = `${realm}${routerPath}/redirect`

  const url = buildUrl({
    'openid.ns': 'http://specs.openid.net/auth/2.0',
    'openid.mode': 'checkid_setup',
    'openid.return_to': returnPath,
    'openid.realm': realm,
    'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
    'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select'
  })

  // const data(`https://steamcommunity.com/openid/login?${url}`)
  ctx.body = `<a href='https://steamcommunity.com/openid/login?${url}'>steam sign in</a>`
})

steam.get('/redirect', async (ctx, next) => {
  const resUrl = ctx.query?.['openid.identity']

  try {
    if (ctx.session.user) { throw new Error('logined') }
    if (!resUrl) { throw new Error('not is steamoauth') }

    const { pathname } = new URL(decodeURIComponent(resUrl))
    const steamid64 = pathname.split('/')[3]

    const result = await axios({
      method: 'get',
      url: 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/' +
        `?key=${oauth.steam.STEAM_APIKEY}&steamids=${steamid64}`,
      headers: {
        'content-type': 'application/json'
      }
    })

    if (!result.data?.response) { throw new Error('steam apikey error') }
    const { personaname, profileurl, avatar } = result.data.response.players[0]

    const [user] = await User.findOrCreate({
      where: {
        oauthId: steamid64
      },
      defaults: {
        name: personaname,
        oauthType: 'S',
        oauthId: steamid64,
        avatar,
        url: profileurl
      }
    })

    ctx.session.user = user

    ctx.body = data(user)
  } catch (error) {
    ctx.body = err(error.message)
  }
})

module.exports = steam
