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
  badgrId: DataTypes.INTEGER,
  email: DataTypes.STRING,
  institution: DataTypes.STRING,
  name: DataTypes.STRING,
  phonenumber: DataTypes.STRING,
  url: DataTypes.STRING,
  validated: DataTypes.BOOL
};
