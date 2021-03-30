import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Address extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }
  Address.init(
    {
      street: DataTypes.STRING,
      number: DataTypes.STRING,
      district: DataTypes.STRING,
      city: DataTypes.STRING,
    },
    {
      sequelize,
    },
  );
  return Address;
};
