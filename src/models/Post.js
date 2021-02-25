module.exports = (sequelize, dataTypes) => {
  const Post = sequelize.define('post', {
    title: {
      type: dataTypes.STRING,
      allowNull: false
    },
    content: {
      type: dataTypes.TEXT,
      defaultValue: ''
    },
    viewCount: {
      type: dataTypes.INET
    }
  })

  Post.associate = (models) => {
    Post.belongsToMany(models.Tag, {
      through: models.PostTags,
      foreignKey: 'postId',
      otherKey: 'tagId'
    })

    Post.hasMany(models.Comment)
    Post.hasMany(models.Reply)
  }

  return Post
}
