import { DataTypes } from 'sequelize';
import { nanoid } from 'nanoid';
import { roles } from '../../constants';

export default {
  id: {
    type: DataTypes.STRING(21),
    allowNull: false,
    defaultValue: nanoid,
    unique: true,
    primaryKey: true
  },
  firebaseUid: DataTypes.STRING,
  email: DataTypes.STRING,
  institute: DataTypes.STRING,
  profilePicture: DataTypes.STRING,
  name: DataTypes.STRING,
  lastName: DataTypes.STRING,
  firstName: DataTypes.STRING,
  notifApp: DataTypes.STRING,
  notifEmail: DataTypes.STRING,
  role: {
    type: DataTypes.ENUM(Object.values(roles)),
    defaultValue: roles.PARTICIPANT
  }
};
