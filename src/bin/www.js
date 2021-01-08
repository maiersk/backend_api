import app from '../index'
import sequelize from '../database/Sequelize'

sequelize.authenticate().then(async () => {
  console.log('connection has been')
  await sequelize.sync({ force: true })

  await app.listen(3000, () => {
    console.log(`listen: ${3000}`)
  })
}).catch((err) => {
  console.log('unable to connect to the database: ', err)
  process.exit()
})
