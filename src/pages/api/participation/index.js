import { Participation, Opportunity } from '../../../sql/sqlClient';
import { errorCodes } from '../../../constants';
import { createApiErrorMessage } from '../../../utils';
import { verifyToken } from '../../../utils/middleware';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await verifyToken(req, res);
    const { user, authenticated } = req.auth;

    if (!authenticated) {
      return res.status(401).end();
    }

    let participations;
    try {
      participations = await Participation.findAll({
        where: {
          UserId: user.id
        },
        include: [{
          model: Opportunity,
          as: 'Opportunity'
        }]
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }
    return res.json(participations);
  }

  if (req.method === 'POST') {
    await verifyToken(req, res);
    const { user, authenticated } = req.auth;

    if (!authenticated) {
      return res.status(401).end();
    }

    try {
      Participation.create({
        message: req.body.message,
        reason: req.body.reason,
        OpportunityId: req.query.opportunity,
        UserId: user.id
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }

    return res.status(204).end();
  }

  return res.status(404).end();
}
