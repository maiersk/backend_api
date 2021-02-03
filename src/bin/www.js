import app from '../index'
import { site, db } from '../config'
import sequelize from '../database/Sequelize'
import { Client } from 'pg'

sequelize.authenticate().then(async () => {
  console.log('connection has been')
  await sequelize.sync({ force: true })

  await app.listen(site.port, () => {
    console.log(`listen: ${site.port}`)
  })
}).catch(async (err) => {
  if (err.message.indexOf(db.database) !== -1) {
    const client = new Client({
      host: db.host,
      port: db.port,
      user: db.username,
      password: db.password
    })
    await client.connect()
    await client.query(`CREATE DATABASE ${db.database}`).catch(() => { })
  }
  console.log('unable to connect to the database: ', err.message)
  await sequelize.close()
  await process.exit()
})
