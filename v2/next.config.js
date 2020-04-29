/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const ENV = process.env.ENV || 'development';
const allEnvVariables = require(`./environments`)(ENV);

module.exports = {
  distDir: 'server/app',
  target: 'serverless',
  poweredByHeader: false,
  env: {
    FIREBASE: allEnvVariables.FIREBASE
    // manually add keys from .env files as such
    // VARIABLE: process.env.VARIABLE
  }
};
