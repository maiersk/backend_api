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
    type: DataTypes.CHAR,
  },
  desction: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.TEXT,
  },
  started_time: {
    type: DataTypes.TIME,
  },
  ended_time: {
    type: DataTypes.TIME,
  }
}, {
  sequelize,
  modelName: 'project'
})

export default Project
