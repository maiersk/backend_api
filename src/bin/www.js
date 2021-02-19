import app from '../index'
import { site, db } from '../config'
import sequelize from '../database/Sequelize'
import { Client } from 'pg'

const client = new Client({
  host: db.host,
  port: db.port,
  user: db.username,
  password: db.password
})

client.connect().then(async () => {
  try {
    await client.query(`CREATE DATABASE ${db.database}`).catch(() => { })
    await sequelize.authenticate()
    console.log('connection has been')

    await sequelize.sync({ force: true })

    await app.listen(site.port, () => {
      console.log(`listen: ${site.port}`)
    })
  } catch (error) {
    throw new Error(error.message)
  }
}).catch(async (err) => {
  console.log('unable to connect to the database: ', err.message)
  await sequelize.close()
  await process.exit()
})
