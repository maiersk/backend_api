export default (sequelize, dataTypes) => {
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
    Post.hasMany(models.Tag)
    Post.hasMany(models.Comment)
    Post.hasMany(models.Reply)
  }

  return Post
}
