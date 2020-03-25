/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const ENV = process.env.ENV || 'development';
const publicENV = require(`./environments`)(ENV);

module.exports = {
  env: {
    ...publicENV
    // manually add keys from .env files as such
    // VARIABLE: process.env.VARIABLE
  }
};
