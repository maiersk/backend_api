import { readdirSync } from 'fs'
import path from 'path'
import sequelize from '../database/Sequelize'
import { DataTypes } from 'sequelize'

const db = {}

readdirSync(__dirname).filter((file) => {
  return file !== 'index.js'
}).forEach((file) => {
  const model = require(path.join(__dirname, file))
  db[file.replace('.js', '')] = model.default(sequelize, DataTypes)
})

Object.keys(db).forEach((modelName) => {
  console.log(modelName)
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize

export default db
