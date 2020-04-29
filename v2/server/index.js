import admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import next from 'next';
import express from 'express';
import cors from 'cors';
import routes from './routes';

const ENV = process.env.ENV || 'development';
const config = require(`../environments`)(ENV);

admin.initializeApp({
  credential: admin.credential.cert(config.FIREBASE_ADMIN),
  databaseURL: config.DB
});

const isDev = ENV !== 'production';
const nextApp = next({ dev: isDev, conf: { distDir: 'dist/app' } });
const handle = nextApp.getRequestHandler();

const server = express();
server.disable('x-powered-by');
server.use(cors({ origin: true }));
server.use('/api/v1', routes);
server.set('trust proxy', 1);

server.get('*', (req, res) => {
  return handle(req, res);
});

// TODO: Optimize cold start times
const app = functions.https.onRequest(async (request, response) => {
  // log the page.js file or resource being requested
  console.log(`File: ${request.originalUrl}`);
  await nextApp.prepare();
  return server(request, response);
});

// eslint-disable-next-line import/prefer-default-export
export { app };
