import { News } from '../../../sql/sqlClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let news;
    try {
      news = await News.findOne({
        where: { id: Number(req.query.id) }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).end('ERROR_GETTING_NEWS_FROM_DB');
    }
    return res.json(news);
  }
  return res.status(404).end();
}
