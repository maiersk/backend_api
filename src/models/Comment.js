module.exports = (sequelize, dataTypes) => {
  const Comment = sequelize.define('comment', {
    postId: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: dataTypes.STRING,
      allowNull: false
    }
  })

  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, {
      as: 'post',
      foreignKey: 'postId',
      targetKey: 'id',
      constraints: false
    })

    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      constraints: false
    })

    Comment.hasMany(models.Reply, {
      foreignKey: 'commentId',
      sourceKey: 'id',
      constraints: false
    })
  }

  return Comment
}
