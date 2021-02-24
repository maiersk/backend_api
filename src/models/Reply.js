module.exports = (sequelize, dataTypes) => {
  const Reply = sequelize.define('reply', {
    comment: {
      type: dataTypes.TEXT,
      allowNull: false
    }
  })

  Reply.associate = (models) => {
    Reply.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      constraints: false
    })
  }

  return Reply
}
