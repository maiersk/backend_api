import sequelize from '../database/Sequelize'
import { DataTypes, Model } from 'sequelize'

class Tag extends Model {

}

Tag.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [0,0,0,0]
    }
}, {
    sequelize,
    modelName: 'tag'
})

export default Tag
