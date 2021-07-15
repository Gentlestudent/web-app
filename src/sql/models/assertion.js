import { DataTypes } from 'sequelize';
import { nanoid } from 'nanoid';
// import { featTypes } from '../../constants';

export default {
  id: {
    type: DataTypes.STRING(21),
    allowNull: false,
    defaultValue: nanoid,
    unique: true,
    primaryKey: true
  },
  issuedOn: {
    type: DataTypes.STRING,
    defaultValue: () => new Date().toISOString()
  // },
  // feat: {
  //   type: DataTypes.ENUM(Object.values(featTypes)),
  //   defaultValue: Object.values(featTypes)[0]
  }
};
