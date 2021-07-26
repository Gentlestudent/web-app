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
    DATABASE_HOST: env.DATABASE_HOST,
    POSTMARK_TOKEN: env.POSTMARK_TOKEN,
    HOST_URL: env.HOST_URL,
    JWT_SECRET: env.JWT_SECRET
  },
  experimental: {
    sprFlushToDisk: false
  }
});
