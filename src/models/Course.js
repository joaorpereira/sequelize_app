import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        foreignKey: 'course_id',
        through: 'Users_Courses',
        as: 'users',
      });
    }
  }
  Course.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'courses',
    },
  );
  return Course;
};
