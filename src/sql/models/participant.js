import { DataTypes, literal } from 'sequelize';
import sqlClient from '../sqlClient';

const Participant = sqlClient.define('Participant', {
  // id: DataTypes.STRING,
  firebaseUid: DataTypes.STRING,
  email: DataTypes.STRING,
  institute: DataTypes.STRING,
  profilePicture: DataTypes.STRING,
  name: DataTypes.STRING,
  lastName: DataTypes.STRING,
  firstName: DataTypes.STRING,
  notifApp: DataTypes.STRING,
  notifEmail: DataTypes.STRING,
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP')
  // }, // updatedAt ON UPDATE doesn't work on mssql
  // updatedAt: {
  //   allowNull: false,
  //   type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
  }
});

export default Participant;
