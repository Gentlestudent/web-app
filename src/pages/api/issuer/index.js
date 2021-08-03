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

    let issuers;
    try {
      const options = {
        where: {
          ...(!!req.query.validated && { validated: req.query.validated }),
          ...(!!req.query.userId && { userId: req.query.userId })
        }
      };
      if (req.query.count === 'true') {
        issuers = await Issuer.count(options);
      } else {
        issuers = await Issuer.findAll({
          ...options,
          limit: Number(req.query.limit || 100),
          offset: (Number(req.query.page - 1) * Number(req.query.limit || 100)) || 0,
          include: [{ model: User, as: 'user', attributes: { exclude: ['password', 'emailVerificationId', 'sessionId'] } }]
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }
    return res.json(issuers);
  }
  return res.status(404).end();
}
