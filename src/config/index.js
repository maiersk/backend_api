import { clientID, clientSecret } from './OAuth/github'
import { STEAM_APIKEY } from './OAuth/steam'

const site = {
  domain: '192.168.199.153',
  port: 3000
}

const sessionCfg = {
  key: 'koa:blog',
  maxAge: 86400000,
  overwrite: true,
  signkeys: ['ojoiBn kAar Solscs kpasjemy'],
  signed: true
}

const db = {
  host: 'localhost',
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
