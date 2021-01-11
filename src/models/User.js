import sequelize from '../database/Sequelize'
import { DataTypes, Model } from 'sequelize'

class User extends Model {
  getName () {
    return this.name
  }
}

User.init({
  name: {
    type: DataTypes.CHAR(60),
    allowNull: false
  },
  oauthType: {
    type: DataTypes.CHAR(1),
    allowNull: false
  },
  oauthId: {
    type: DataTypes.CHAR(60),
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.STRING(100)
  }
}, {
  sequelize,
  modelName: 'user'
})

export default User
