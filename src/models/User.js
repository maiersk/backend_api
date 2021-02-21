export default (sequelize, dataTypes) => {
  const User = sequelize.define('user', {
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
  })

  User.associate = (models) => {
    User.hasMany(models.Comment)
    User.hasMany(models.Reply)
  }

  return User
}
