import { Model } from 'sequelize'

module.exports = (sequelize, dataTypes) => {
  class User extends Model {

  }

  User.init({
    name: {
      type: dataTypes.CHAR(60),
      allowNull: false
    },
    oauthType: {
      type: dataTypes.CHAR(1),
      allowNull: false
    },
    oauthId: {
      type: dataTypes.CHAR(60),
      allowNull: false
    },
    avatar: {
      type: dataTypes.STRING
    },
    url: {
      type: dataTypes.STRING(100)
    }
  }, {
    sequelize,
    modelName: 'user'
  }
  )

  User.associate = (models) => {
    User.hasMany(models.Comment)
    User.hasMany(models.Reply)
  }

  return User
}
