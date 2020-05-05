const admin = require('firebase-admin');
const functions = require('firebase-functions');
const next = require('next');
const config = require('./next.config');

admin.initializeApp();

const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  conf: config
});
const handle = app.getRequestHandler();

const server = functions.https.onRequest((request, response) => {
  return app.prepare().then(() => handle(request, response));
});

exports.nextjs = { server };
