const path = require('path');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const next = require('next');
const { createUser, resetPassword, changeEmail } = require('./auth');
const config = require('../next.config');

global.env = require('../environments')(process.env.NODE_ENV || 'development');

admin.initializeApp();

const app = next({
  dev: process.env.NODE_ENV !== 'production',
  conf: config,
  dir: path.join(__dirname, '../src')
});
const handle = app.getRequestHandler();

exports.createUser = functions.auth.user().onCreate(createUser);
exports.resetPassword = functions.https.onCall(resetPassword);
exports.changeEmail = functions.https.onCall(changeEmail);

const server = functions.https.onRequest((request, response) => {
  return app.prepare().then(() => handle(request, response));
});

module.exports = server;
