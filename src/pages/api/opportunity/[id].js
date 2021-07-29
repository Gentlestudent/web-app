import { Opportunity, Issuer, User } from '../../../sql/sqlClient';
import { verifyToken } from '../../../utils/middleware';
import { roles, errorCodes } from '../../../constants';
import { createApiErrorMessage } from '../../../utils';

async function handler(req, res) {
  if (req.method === 'GET') {
    await verifyToken(req, res);
    const { user } = req.auth;

    let opportunity;
    try {
      const include = [{
        model: Issuer,
        as: 'issuer',
        include: [{
          model: User,
          as: 'user',
          attributes: { exclude: ['password', 'emailVerificationId', 'sessionId'] }
        }]
      }];
      if (user?.role === roles.ADMIN || user?.role === roles.ISSUER) {
        include.push({ model: User, as: 'participants', attributes: { exclude: ['password', 'emailVerificationId', 'sessionId'] } });
      }
      if (user?.role === roles.PARTICIPANT) {
        include.push({
          model: User,
          as: 'participants',
          attributes: { exclude: ['password', 'emailVerificationId', 'sessionId'] },
          where: { id: user.id },
          required: false
        });
      }
      opportunity = await Opportunity.findOne({
        where: { id: req.query.id },
        include
      });
      if (user?.role === roles.ISSUER && opportunity.issuer?.userId !== user?.id) {
        opportunity.set('participants', []);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }
    return res.json(opportunity);
  }

  return res.status(404).end();
}

export default handler;
