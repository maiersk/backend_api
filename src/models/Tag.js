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
    Tag.hasMany(models.PostTags)
  }

  return Tag
}
