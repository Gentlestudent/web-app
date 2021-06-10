import { DataTypes } from 'sequelize';

export default {
  author: DataTypes.STRING,
  imageUrl: DataTypes.STRING,
  longText: DataTypes.TEXT,
  published: DataTypes.STRING,
  shortText: DataTypes.TEXT,
  title: DataTypes.STRING
};
