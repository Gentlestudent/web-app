import { User, Issuer } from '../../../sql/sqlClient';
import { verifyToken } from '../../../utils/middleware';
import { hasRole, createApiErrorMessage } from '../../../utils';
import { roles, errorCodes } from '../../../constants';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(404).end();

  await verifyToken(req, res);
  const { user: authenticatedUser, authenticated } = req.auth;

  if (!authenticated || !hasRole(authenticatedUser, roles.PARTICIPANT)) {
    return res.status(401).end();
  }

  const { id } = req.query;
  let user, issuer;
  try {
    user = await User.findOne({
      where: { id },
      attributes: {
        exclude: ['password', 'emailVerificationId', 'sessionId']
      }
    });
    issuer = await Issuer.findOne({ where: { userId: user?.id } });
  } catch (error) {
    console.error(error);
    return res.status(500).json(createApiErrorMessage(errorCodes.ERROR_GETTING_USER));
  }

  return res.json({
    ...user?.toJSON(),
    issuer: issuer?.toJSON()
  });
}
