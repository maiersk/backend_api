import { site } from '../config'
import { err } from './res_msg'

export default function oauth () {
  return async function (ctx, next) {
    try {
      if (ctx.session?.user) {
        if (ctx.session.user.oauthId === site.owner.githubId ||
          ctx.session.user.oauthId === site.owner.steamId
        ) {
          await next()
        } else {
          throw new Error('not webSite Owner')
        }
      } else {
        throw new Error('no user login')
      }
    } catch (error) {
      ctx.body = err(error.message)
    }
  }
}
