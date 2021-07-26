import { Opportunity, Issuer } from '../../../sql/sqlClient';
import { verifyToken } from '../../../utils/middleware';
import { hasRole, createApiErrorMessage } from '../../../utils';
import { roles, errorCodes } from '../../../constants';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let opportunities;
    try {
      opportunities = await Opportunity.findAll({
        where: {
          authority: 1,
          ...(!!req.query.authority && { authority: req.query.authority }),
          ...(!!req.query.issuerId && { issuerId: req.query.issuerId })
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }
    return res.json(opportunities);
  }
  if (req.method === 'POST') {
    await verifyToken(req, res);
    const { user, authenticated } = req.auth;

    if (!authenticated || !hasRole(user, roles.ISSUER)) {
      return res.status(401).end();
    }

    const issuer = Issuer.findOne({
      where: { userId: user.id },
      attributes: ['id']
    })

    try {
      await Opportunity.create({
        beginDate: req.body.startDate,
        category: Number(req.body.domain) || 1,
        contact: req.body.email,
        difficulty: Number(req.body.level) || 1,
        endDate: req.body.endDate,
        issuerId: issuer.id,
        longDescription: req.body.description,
        // shortDescription: req.body.shortDescription,
        // moreInfo: req.body.moreInfo,
        title: req.body.title,
        expectations: req.body.expectations,
        website: req.body.website,
        addressCity: req.body.city,
        ...(!!req.body.number && { addressHousenumber: Number(req.body.number) || 1 }),
        ...(!!req.body.postal && { addressPostalcode: Number(req.body.postal) || 1000 }),
        addressStreet: req.body.street,
        addressLatitute: req.body.addressLongitude,
        addressLongitude: req.body.addressLatitude
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }
    return res.status(204).end();
  }
  return res.status(404).end();
}
