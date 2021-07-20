import { Issuer } from '../../../sql/sqlClient';
import { verifyToken } from '../../../utils/middleware';
import { hasRole, createApiErrorMessage } from '../../../utils';
import { roles, errorCodes } from '../../../constants';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await verifyToken(req, res);
    const { user, authenticated } = req.auth;

    if (!authenticated || !hasRole(user, roles.PARTICIPANT)) {
      return res.status(401).end();
    }

    try {
      if (!req.body.id) {
        return req.status(400).json(createApiErrorMessage(errorCodes.USER_ID_REQUIRED));
      }
      await Issuer.create({
        ...(!!req.body.institute && { institute: req.body.institute }),
        ...(!!req.body.longName && { longName: req.body.longName }),
        ...(!!req.body.url && { url: req.body.url }),
        ...(!!req.body.phonenumber && { phonenumber: req.body.phonenumber }),
        // ...(!!req.body.street && { street: req.body.street }),
        // ...(!!req.body.housenumber && { housenumber: req.body.housenumber }),
        // ...(!!req.body.bus && { bus: req.body.bus }),
        // ...(!!req.body.postalcode && { postalcode: req.body.postalcode }),
        // ...(!!req.body.city && { city: req.body.city }),
        userId: req.body.id
      });
    } catch (error) {
      console.error(error);
      return req.status(500).json(createApiErrorMessage(errorCodes.ERROR_REGISTERING_ISSUER));
    }
    return res.status(200).end();
  }
  return res.status(404).end();
}
