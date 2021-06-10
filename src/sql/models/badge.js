import { DataTypes } from 'sequelize';

export default {
  badgrId: DataTypes.INTEGER,
  criteria: DataTypes.TEXT,
  description: DataTypes.TEXT,
  image: DataTypes.STRING,
  issuerId: DataTypes.INTEGER,
  name: DataTypes.STRING,
  type: DataTypes.STRING
};
