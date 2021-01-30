import sequelize from '../database/Sequelize'
import { DataTypes, Model } from 'sequelize'
import Tag from './Tag'

class Post extends Model {

}

Post.init({
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    defaultValue: ''
  }
}, {
  sequelize,
  modelName: 'post'
})

sequelize.define('PostTags', {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tagId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

Post.belongsToMany(Tag, {
  through: 'PostTags'
})

export default Post
