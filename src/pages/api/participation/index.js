import getSqlClient from '../../../sql/sqlClient';
import { errorCodes } from '../../../constants';
import { createApiErrorMessage } from '../../../utils';
import { verifyToken } from '../../../utils/middleware';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await verifyToken(req, res);
    const { authenticated } = req.auth;

    if (!authenticated) {
      return res.status(401).end();
    }

    const { Participation, Opportunity } = await getSqlClient();

    try {
      if (req.query.opportunities === '') {
        req.query.opportunities = '0'; // if the 'opportunities' query parameter is defined but the list is empty we should return an empty list of participations
      }
      const options = {
        where: {
          ...(!!req.query.user && { UserId: req.query.user }),
          ...(!!req.query.opportunities && { OpportunityId: req.query.opportunities.split(',') })
        },
        limit: Number(req.query.limit || 100),
        offset: (Number(req.query.page - 1) * Number(req.query.limit || 100)) || 0,
        include: [{
          model: Opportunity,
          as: 'Opportunity'
        }]
      };
      const [count, participations] = await Promise.all([
        Participation.count({ where: options.where }),
        Participation.findAll(options)
      ]);
      return res.json({
        data: participations,
        count,
        page: options.offset,
        limit: options.limit
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }
  }

  if (req.method === 'POST') {
    await verifyToken(req, res);
    const { user, authenticated } = req.auth;

    if (!authenticated) {
      return res.status(401).end();
    }

    const { Participation } = await getSqlClient();

    try {
      await Participation.create({
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
