import express from 'express';

const router = express.Router();

router.get('/hello', (req, res) => {
  return res.end('hello world');
});

export default router;
