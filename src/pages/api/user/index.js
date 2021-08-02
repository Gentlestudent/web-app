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

    let users;
    try {
      if (req.query.roles === '') {
        req.query.roles = '0'; // if the 'roles' query parameter is defined but the list is empty we should return an empty list of users
      }
      const options = {
        where: {
          ...(!!req.query.roles && { role: req.query.roles.split(',') })
        }
      };
      if (req.query.count === 'true') {
        users = await User.count(options);
      } else {
        users = await User.findAll({
          ...options,
          attributes: { exclude: ['password', 'emailVerificationId', 'sessionId'] }
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }
    return res.json(users);
  }
  return res.status(404).end();
}
