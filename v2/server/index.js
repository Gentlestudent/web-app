const admin = require('firebase-admin');
const functions = require('firebase-functions');
const next = require('next');

const ENV = process.env.ENV || 'development';
const config = require(`../environments`)(ENV);

admin.initializeApp({
  credential: admin.credential.cert(config.FIREBASE_ADMIN),
  databaseURL: config.DB
});

const isDev = ENV !== 'production';
const app = next({
  dev: isDev,
  conf: { distDir: 'dist/app' }
});
const handle = app.getRequestHandler();

// TODO: Optimize cold start times
const api = functions.https.onRequest((request, response) => {
  // log the page.js file or resource being requested
  console.log(`File: ${request.originalUrl}`);
  return app.prepare().then(() => handle(request, response));
});

const nextjs = {
  api
};

// eslint-disable-next-line import/prefer-default-export
module.exports = { nextjs };
