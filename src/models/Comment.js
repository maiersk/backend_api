import sequelize from '../database/Sequelize'
import { DataTypes, Model } from 'sequelize'

class Comment extends Model {

}

Comment.init({
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'comment'
})

export default Comment
