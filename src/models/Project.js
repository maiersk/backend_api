module.exports = (sequelize, dataTypes) => {
  const Project = sequelize.define('project', {
    name: {
      type: dataTypes.STRING,
      allowNull: false
    },
    url: {
      type: dataTypes.CHAR
    },
    desction: {
      type: dataTypes.STRING
    },
    content: {
      type: dataTypes.TEXT
    },
    startedTime: {
      type: dataTypes.TIME
    },
    endedTime: {
      type: dataTypes.TIME
    },
    followCount: {
      type: dataTypes.INTEGER,
      defaultValue: 0
    }
  })

  return Project
}
