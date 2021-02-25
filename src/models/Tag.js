module.exports = (sequelize, dataTypes) => {
  const Tag = sequelize.define('tag', {
    name: {
      type: dataTypes.STRING,
      allowNull: false
    },
    color: {
      type: dataTypes.CHAR(7),
      defaultValue: '#ffffff'
    }
  })

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Post, {
      through: models.PostTags,
      foreignKey: 'tagId',
      otherKey: 'postId'
    })
  }

  return Tag
}
