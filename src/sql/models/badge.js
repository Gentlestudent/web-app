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
  criteria: DataTypes.TEXT,
  description: DataTypes.TEXT,
  image: DataTypes.TEXT,
  name: DataTypes.STRING,
  type: DataTypes.STRING
};
