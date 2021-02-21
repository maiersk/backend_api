export default (sequelize, dataTypes) => {
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
    Tag.belongsTo(models.Post, {
      as: 'post',
      foreignKey: 'postId',
      targetKey: 'id',
      constraints: false
    })
  }

  return Tag
}
