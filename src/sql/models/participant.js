import { DataTypes } from 'sequelize';

export default {
  firebaseUid: DataTypes.STRING,
  email: DataTypes.STRING,
  institute: DataTypes.STRING,
  profilePicture: DataTypes.STRING,
  name: DataTypes.STRING,
  lastName: DataTypes.STRING,
  firstName: DataTypes.STRING,
  notifApp: DataTypes.STRING,
  notifEmail: DataTypes.STRING
};
