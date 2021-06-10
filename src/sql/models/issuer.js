import { DataTypes } from 'sequelize';

export default {
  addressID: DataTypes.INTEGER,
  badgrId: DataTypes.INTEGER,
  email: DataTypes.STRING,
  institution: DataTypes.STRING,
  name: DataTypes.STRING,
  phonenumber: DataTypes.STRING,
  url: DataTypes.STRING,
  validated: DataTypes.BOOL
};
