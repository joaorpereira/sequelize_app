import { Model } from 'sequelize';
import * as bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Address, {
        foreignKey: 'user_id',
        as: 'address',
      });
      this.belongsToMany(models.Course, {
        foreignKey: 'user_id',
        through: 'Users_Courses',
        as: 'courses',
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        },
      },
    },
  );
  return User;
};
