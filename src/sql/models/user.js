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
  password: DataTypes.STRING,
  email: DataTypes.STRING,
  emailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  emailVerificationId: DataTypes.STRING(21),
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
