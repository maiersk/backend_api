import sequelize from '../database/Sequelize'
import { DataTypes, Model } from 'sequelize'

class Tag extends Model {

}

Tag.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  color: {
    type: DataTypes.CHAR(7),
    defaultValue: '#ffffff'
  }
}, {
  sequelize,
  modelName: 'tag'
})

export default Tag
