import Router from 'koa-router'
import buildUrl from '../../../util/buildUrl'
import { site } from '../../../config'
import { data } from '../../../lib/res_msg'

const steam = new Router()
const routerPath = '/oauth/steam'
steam.prefix(routerPath)

steam.get('/', async (ctx, next) => {
  const realm = `http://${site.domain}:${site.port}`
  const returnPath = `${realm}/redirect`

  const url = buildUrl({
    'openid.ns': 'http://specs.openid.net/auth/2.0',
    'openid.mode': 'checkid_setup',
    'openid.return_to': returnPath,
    'openid.realm': realm,
    'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
    'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select'
  })

  ctx.body = data(`https://steamcommunity.com/openid/login?${url}`)
})

steam.get('/redirect', async (ctx, next) => {

})

module.exports = steam
