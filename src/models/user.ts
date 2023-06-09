import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize'

class User extends Model {}
User.init({
  phone: DataTypes.STRING,
  bankId: DataTypes.STRING,
  active:{
    type: DataTypes.BOOLEAN,
    defaultValue:true
  }
}, { sequelize, modelName: 'my_user' });
export default User;