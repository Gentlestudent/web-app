import { Assertion, User, Badge } from '../../../sql/sqlClient';
import { verifyToken } from '../../../utils/middleware';
import { hasRole, createApiErrorMessage } from '../../../utils';
import { roles, errorCodes } from '../../../constants';
import { buildAssertion, buildBadge } from '../../../badges';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await verifyToken(req, res);
    const { user, authenticated } = req.auth;

    if (!authenticated || !hasRole(user, roles.PARTICIPANT)) {
      return res.status(401).end();
    }

    if (!req.query.recipient) {
      return res.status(400).json(createApiErrorMessage(errorCodes.ERROR_RECIPIENT_QUERY_PARAMETER_IS_REQUIRED));
    }

    let assertions;
    try {
      const rawAssertions = await Assertion.findAll({
        where: { recipientId: req.query.recipient },
        include: [{
          model: User,
          as: 'recipient',
          attributes: { exclude: ['password', 'emailVerificationId', 'sessionId'] }
        },
        {
          model: Badge,
          as: 'badge'
        }]
      });
      const builtAssertions = rawAssertions.map(buildAssertion);

      if (req.query.includeBadge === 'true') {
        rawAssertions.forEach((assertion, index) => {
          builtAssertions[index].badge = buildBadge(assertion.badge);
        });
      }

      assertions = builtAssertions;
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }
    return res.json(assertions);
  }

  return res.status(404).end();
}
