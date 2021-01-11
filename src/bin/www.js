import app from '../index'
import { site } from '../config'
import sequelize from '../database/Sequelize'

sequelize.authenticate().then(async () => {
  console.log('connection has been')
  await sequelize.sync({ force: true })

  await app.listen(site.port, () => {
    console.log(`listen: ${site.port}`)
  })
}).catch((err) => {
  console.log('unable to connect to the database: ', err.message)
  sequelize.close()
  process.exit()
})
