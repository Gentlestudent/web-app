import { Opportunity } from '../../../sql/sqlClient';
import { verifyToken } from '../../../utils/middleware';
import { hasRole, createApiErrorMessage } from '../../../utils';
import { roles, errorCodes } from '../../../constants';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let opportunities;
    try {
      opportunities = await Opportunity.findAll({
        where: {
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

    try {
      await Opportunity.create({
        // addressId: req.body.addressId,
        // authority: req.body.authority,
        // badgeId: req.body.badgeId,
        beginDate: req.body.startDate,
        category: Number(req.body.domain) || 1,
        // contact: req.body.contact,
        difficulty: Number(req.body.level) || 1,
        endDate: req.body.endDate,
        // international: req.body.international,
        // issuerId: req.body.issuerId,
        longDescription: req.body.description,
        // shortDescription: req.body.shortDescription,
        // moreInfo: req.body.moreInfo,
        // oppImageUrl: req.body.oppImageUrl,
        // participations: req.body.participations,
        // pinImageUrl: req.body.pinImageUrl,
        title: req.body.title,
        website: req.body.website,
        // addressBus: req.body.bus,
        addressCity: req.body.city,
        // addressCountry: req.body.country,
        ...(!!req.body.number && { addressHousenumber: Number(req.body.number) || 1 }),
        // addressLatitute: req.body.latitude,
        // addressLongitude: req.body.longitude,
        ...(!!req.body.postal && { addressPostalcode: Number(req.body.postal) || 1000 }),
        addressStreet: req.body.street
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }
    return res.status(204).end();
  }
  return res.status(404).end();
}
