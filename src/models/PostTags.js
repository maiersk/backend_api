module.exports = (sequelize, dataTypes) => {
  const PostTags = sequelize.define('postTags', {
  })

  PostTags.associate = (models) => {
    PostTags.belongsTo(models.Post)
    PostTags.belongsTo(models.Tag)
  }

  return PostTags
}
