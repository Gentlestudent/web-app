import { Opportunity } from '../../../sql/sqlClient';
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

    const opportunityId = req.query.id;
    if (!opportunityId) {
      return req.status(400).json(createApiErrorMessage(errorCodes.MISSING_OPPORTUNITY_ID));
    }

    try {
      await Opportunity.update({
        authority: 2
      }, {
        where: {
          id: opportunityId
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.ERROR_DENYING_OPPORTUNITY));
    }
    return res.send('ok');
  }
  return res.status(404).end();
}
