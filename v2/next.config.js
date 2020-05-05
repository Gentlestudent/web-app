const env = require('./environments')(process.env.NODE_ENV || 'development');

module.exports = {
  distDir: 'nextjs',
  env: {
    FIREBASE_PROJECT_ID: 'gentlestudent-dev',
    FIREBASE: env.public.FIREBASE
  },
  experimental: {
    sprFlushToDisk: false
  }
};
