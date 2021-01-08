import sequelize from '../database/Sequelize'
import { DataTypes, Model } from 'sequelize'

class User extends Model {
  getName() {
    return this.name
  }
}

User.init({
  name: {
    type: DataTypes.CHAR(10),
    allowNull: false,
  },
  group: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: 'user'
})

export default User
