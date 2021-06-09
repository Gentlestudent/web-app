import { DataTypes, literal } from 'sequelize';
import sqlClient from '../sqlClient';

const Opportunity = sqlClient.define('Opportunity', {
  // id: DataTypes.STRING,
  addressId: DataTypes.STRING,
  authority: DataTypes.INTEGER,
  badgeId: DataTypes.STRING,
  beginDate: DataTypes.STRING,
  category: DataTypes.INTEGER,
  contact: DataTypes.STRING,
  difficulty: DataTypes.INTEGER,
  endDate: DataTypes.STRING,
  international: DataTypes.BOOLEAN,
  issuerId: DataTypes.STRING,
  longDescription: DataTypes.TEXT,
  shortDescription: DataTypes.STRING,
  moreInfo: DataTypes.STRING,
  oppImageUrl: DataTypes.STRING,
  participations: DataTypes.INTEGER,
  pinImageUrl: DataTypes.STRING,
  title: DataTypes.STRING,
  website: DataTypes.STRING,
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

export default Opportunity;
