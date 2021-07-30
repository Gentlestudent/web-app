import { Assertion, User, Participation, Opportunity, Issuer } from '../../../sql/sqlClient';
import { verifyToken } from '../../../utils/middleware';
import { hasRole, createApiErrorMessage } from '../../../utils';
import { roles, errorCodes } from '../../../constants';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await verifyToken(req, res);
    const { user, authenticated } = req.auth;

    if (!authenticated || !hasRole(user, roles.PARTICIPANT)) {
      return res.status(401).end();
    }

    if (!req.query.id) {
      return res.status(400).json(createApiErrorMessage(errorCodes.ERROR_OPPORTUNITY_ID_QUERY_PARAMETER_IS_REQUIRED));
    }

    const id = req.query.id;

    let participation;
    try {
      participation = await Participation.findOne({
        where: {
          OpportunityId: id
        },
        attributes: ['id', 'status', 'UserId'],
        include: [{
          model: Opportunity,
          as: 'Opportunity',
          attributes: ['badgeId', 'difficulty'],
          include: [{
            model: Issuer,
            as: 'issuer',
            attributes: ['userId']
          }]
        }, {
          model: User,
          as: 'User',
          attributes: ['id']
        }]
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }

    const isLowestDifficulty = participation.Opportunity.difficulty === 0;
    const isOpportunityIssuer = hasRole(user, roles.ISSUER) && user.id === participation.Opportunity.issuer.userId;
    const isAdmin = hasRole(user, roles.ADMIN);
    if (!isLowestDifficulty && !isOpportunityIssuer && !isAdmin) {
      return res.status(401).end();
    }

    try {
      const assertion = await Assertion.findOne({
        where: {
          recipientId: participation.User.id,
          badgeId: participation.Opportunity.badgeId
        }
      });
      if (assertion) {
        return res.status(400).json(createApiErrorMessage(errorCodes.ASSERTION_ALREADY_EXISTS));
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }

    try {
      await Assertion.create({
        badgeId: participation.Opportunity.badgeId,
        recipientId: participation.User.id
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }

    return res.status(204).end();
  }

  return res.status(404).end();
}
