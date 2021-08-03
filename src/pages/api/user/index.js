import getSqlClient from '../../../sql/sqlClient';
import { verifyToken } from '../../../utils/middleware';
import { hasRole, createApiErrorMessage } from '../../../utils';
import { roles, errorCodes } from '../../../constants';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await verifyToken(req, res);
    const { user, authenticated } = req.auth;

    if (!authenticated || !hasRole(user, roles.ADMIN)) {
      return res.status(401).end();
    }

    const { User } = await getSqlClient();

    try {
      if (req.query.roles === '') {
        req.query.roles = '0'; // if the 'roles' query parameter is defined but the list is empty we should return an empty list of users
      }
      const options = {
        where: {
          ...(!!req.query.roles && { role: req.query.roles.split(',') })
        },
        limit: Number(req.query.limit || 100),
        offset: (Number(req.query.page - 1) * Number(req.query.limit || 100)) || 0,
        attributes: { exclude: ['password', 'emailVerificationId', 'sessionId'] }
      };
      const [count, users] = await Promise.all([
        User.count({ where: options.where }),
        User.findAll(options)
      ]);
      return res.json({
        data: users,
        count,
        page: options.offset,
        limit: options.limit
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }
  }
  return res.status(404).end();
}
