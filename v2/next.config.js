/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const path = require('path');

const ENV = process.env.ENV || 'development';
const publicENV = require(`./environments`)(ENV);

module.exports = {
  webpack: (config) => {
    // root import alias
    config.resolve.alias['@'] = path.resolve(`${__dirname}/`);
    return config;
  },
  env: {
    ...publicENV
    // manually add keys from .env files as such
    // VARIABLE: process.env.VARIABLE
  }
};
