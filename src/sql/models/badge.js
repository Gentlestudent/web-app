import { DataTypes } from 'sequelize';

export default {
  criteria: DataTypes.TEXT,
  description: DataTypes.TEXT,
  image: DataTypes.STRING,
  name: DataTypes.STRING,
  type: DataTypes.STRING
};
