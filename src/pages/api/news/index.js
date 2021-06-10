import { News } from '../../../sql/sqlClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let news;
    try {
      news = await News.findAll();
    } catch (error) {
      console.error(error);
      return res.status(500).end('ERROR_GETTING_NEWS_FROM_DB');
    }
    return res.json(news);
  }
  if (req.method === 'POST') {
    try {
      await News.create({
        author: req.body.author,
        imageUrl: req.body.imageUrl,
        longText: req.body.longText,
        published: req.body.published,
        shortText: req.body.shortText,
        title: req.body.title
      });
    } catch (error) {
      console.error(error);
      return res.status(500).end('ERROR_CREATING_NEWS');
    }
    return res.status(204).end();
  }
  return res.status(404).end();
}
