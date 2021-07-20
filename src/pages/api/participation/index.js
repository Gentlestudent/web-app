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
      return res.status(500).json(createApiErrorMessage(errorCodes.ERROR_GETTING_PARTICIPATIONS_FROM_DB));
    }
    return res.json(participations);
  }

  return res.status(404).end();
}
