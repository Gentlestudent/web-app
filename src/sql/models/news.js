import { DataTypes } from 'sequelize';
import { nanoid } from 'nanoid';

export default {
  id: {
    type: DataTypes.STRING(21),
    allowNull: false,
    defaultValue: nanoid,
    unique: true,
    primaryKey: true
  },
  author: DataTypes.STRING,
  imageUrl: DataTypes.STRING,
  longText: DataTypes.TEXT,
  published: DataTypes.STRING,
  shortText: DataTypes.TEXT,
  title: DataTypes.STRING
};
