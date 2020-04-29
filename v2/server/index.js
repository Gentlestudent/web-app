const functions = require('firebase-functions');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { distDir: 'app' } });
const handle = app.getRequestHandler();

exports.app = functions.https.onRequest(async (req, res) => {
  await app.prepare();
  handle(req, res);
});
