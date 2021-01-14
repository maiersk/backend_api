import sequelize from '../database/Sequelize'
import { DataTypes, Model } from 'sequelize'

class Project extends Model {

}

Project.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.CHAR
  },
  desction: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.TEXT
  },
  startedTime: {
    type: DataTypes.TIME
  },
  endedTime: {
    type: DataTypes.TIME
  },
  followCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'project'
})

export default Project
