import {clientID, clientSecret} from './github'

const session_cfg = {
    key: 'qwoejoxjcasd',
    maxAge: 86400000,
    secure: true,
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
}

export { db, session_cfg, oauth }
