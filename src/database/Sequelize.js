import { db } from '../config'
import { Sequelize } from 'sequelize'

const {
  database,
  username,
  password,
  host,
  port,
  dialect
} = db

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
  }
})

export default sequelize
