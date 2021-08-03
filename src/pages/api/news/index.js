import getSqlClient from '../../../sql/sqlClient';
import { verifyToken } from '../../../utils/middleware';
import { hasRole, createApiErrorMessage } from '../../../utils';
import { roles, errorCodes } from '../../../constants';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { News } = await getSqlClient();
    try {
      const options = {
        where: {},
        limit: Number(req.query.limit || 100),
        offset: (Number(req.query.page - 1) * Number(req.query.limit || 100)) || 0,
        order: [['published', 'DESC']]
      };
      const [count, news] = await Promise.all([
        News.count({ where: options.where }),
        News.findAll(options)
      ]);
      return res.json({
        data: news,
        count,
        page: options.offset,
        limit: options.limit
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }
  }
  if (req.method === 'POST') {
    await verifyToken(req, res);
    const { user, authenticated } = req.auth;

    if (!authenticated || !hasRole(user, roles.ADMIN)) {
      return res.status(401).end();
    }

    const { News } = await getSqlClient();

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
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }
    return res.status(204).end();
  }
  return res.status(404).end();
}
