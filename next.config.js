require('dotenv').config();
const withOptimizedImages = require('next-optimized-images');
const env = require('./environments')(process.env.NODE_ENV || 'development');

module.exports = withOptimizedImages({
  distDir: 'next',
  env: {
    FIREBASE_PROJECT_ID: env.FIREBASE.projectId,
    FIREBASE: env.FIREBASE,
    FIREBASE_ADMIN: env.FIREBASE_ADMIN,
    USE_FUNCTIONS_EMULATOR: env.USE_FUNCTIONS_EMULATOR,
    DATABASE_DATABASE: env.DATABASE_DATABASE,
    DATABASE_USERNAME: env.DATABASE_USERNAME,
    DATABASE_PASSWORD: env.DATABASE_PASSWORD,
    DATABASE_HOST: env.DATABASE_HOST
  },
  experimental: {
    sprFlushToDisk: false
  }
});
