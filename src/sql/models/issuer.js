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
  institute: DataTypes.STRING,
  longname: DataTypes.STRING,
  phonenumber: DataTypes.STRING,
  url: DataTypes.STRING,
  street: DataTypes.STRING,
  housenumber: DataTypes.STRING,
  bus: DataTypes.STRING,
  postalcode: DataTypes.STRING,
  city: DataTypes.STRING,
  validated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
};
