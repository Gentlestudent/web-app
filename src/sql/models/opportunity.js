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
  authority: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  beginDate: DataTypes.STRING,
  category: DataTypes.INTEGER,
  contact: DataTypes.STRING,
  difficulty: DataTypes.INTEGER,
  endDate: DataTypes.STRING,
  international: DataTypes.BOOLEAN,
  longDescription: DataTypes.TEXT,
  shortDescription: DataTypes.STRING,
  moreInfo: DataTypes.STRING,
  oppImageUrl: DataTypes.STRING,
  participations: DataTypes.INTEGER,
  pinImageUrl: DataTypes.STRING,
  title: DataTypes.STRING,
  website: DataTypes.STRING,
  addressBus: DataTypes.STRING,
  addressCity: DataTypes.STRING,
  addressCountry: DataTypes.STRING,
  addressHousenumber: DataTypes.INTEGER,
  addressLatitude: DataTypes.FLOAT,
  addressLongitude: DataTypes.FLOAT,
  addressPostalcode: DataTypes.INTEGER,
  addressStreet: DataTypes.STRING
};
