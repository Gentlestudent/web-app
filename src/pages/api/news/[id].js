import { News } from '../../../sql/sqlClient';
import { createApiErrorMessage } from '../../../utils';
import { errorCodes } from '../../../constants';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let news;
    try {
      news = await News.findOne({
        where: { id: req.query.id }
      });
    } catch (error) {
      console.error(error);
      return req.status(500).json(createApiErrorMessage(errorCodes.ERROR_GETTING_NEWS_FROM_DB));
    }
    return res.json(news);
  }
  return res.status(404).end();
}
