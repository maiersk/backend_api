import sequelize from '../database/Sequelize'
import { DataTypes, Model } from 'sequelize'

class Post extends Model {

}

Post.init({
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  content: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  comments: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  }
}, {
  sequelize,
  modelName: 'post'
})

export default Post
