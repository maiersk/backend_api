import { clientID, clientSecret } from './OAuth/github'
import { STEAM_APIKEY } from './OAuth/steam'
import { site, signkeys } from './site'

// const site = {
//   domain: host,
//   port: 3000,
//   owner: {
//     // githubId,
//     // steamId
//   },
//   frontend: {
//     domain: host,
//     port: 8080
//   }
// }

const sessionCfg = {
  key: 'koa:blog',
  maxAge: 86400000,
  overwrite: true,
  signkeys,
  signed: true
}

const db = {
  host: site.domain,
  port: 5432,
  dialect: 'postgres',
  database: 'myblog',
  username: 'postgres',
  password: '123456'
}

const oauth = {
  github: {
    clientID,
    clientSecret
  },
  steam: {
    STEAM_APIKEY
  }
}

export { site, db, sessionCfg, oauth }
