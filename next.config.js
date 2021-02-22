const withOptimizedImages = require('next-optimized-images');
const env = require('./environments')(process.env.NODE_ENV || 'development');

module.exports = withOptimizedImages({
  distDir: 'next',
  env: {
    FIREBASE_PROJECT_ID: env.FIREBASE.projectId,
    FIREBASE: env.FIREBASE,
    USE_FUNCTIONS_EMULATOR: env.USE_FUNCTIONS_EMULATOR
  },
  experimental: {
    sprFlushToDisk: false
  }
});
