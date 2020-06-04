const withOptimizedImages = require('next-optimized-images');
const env = require('./environments')(process.env.NODE_ENV || 'development');

module.exports = withOptimizedImages({
  distDir: 'next',
  env: {
    FIREBASE_PROJECT_ID: env.public.FIREBASE.projectId,
    FIREBASE: env.public.FIREBASE
  },
  experimental: {
    sprFlushToDisk: false
  }
});
