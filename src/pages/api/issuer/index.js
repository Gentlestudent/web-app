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

    const { Issuer, User } = await getSqlClient();

    try {
      const options = {
        where: {
          ...(!!req.query.validated && { validated: req.query.validated }),
          ...(!!req.query.userId && { userId: req.query.userId })
        },
        limit: Number(req.query.limit || 100),
        offset: (Number(req.query.page - 1) * Number(req.query.limit || 100)) || 0,
        order: [[{ model: User, as: 'user' }, 'firstName', 'DESC']],
        include: [{ model: User, as: 'user', attributes: { exclude: ['password', 'emailVerificationId', 'sessionId'] } }]
      };

      // order
      if (req.query.sort) {
        const descending = req.query.sort[0] === '-';
        const order = descending ? req.query.sort.slice(1) : req.query.sort;

        const validOrderValues = new Set(['firstName', 'institute', 'validated']);

        if (validOrderValues.has(order)) {
          options.order = [
            [
              order,
              descending ? 'DESC' : 'ASC'
            ]
          ];

          if (order === 'firstName') {
            options.order[0].unshift({ model: User, as: 'user' });
          }
        }
      }

      const [count, issuers] = await Promise.all([
        Issuer.count({ where: options.where }),
        Issuer.findAll(options)
      ]);
      return res.json({
        data: issuers,
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
