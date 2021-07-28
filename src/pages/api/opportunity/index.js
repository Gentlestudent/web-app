import fs from 'fs';
import { promisify } from 'util';
import { Opportunity, Issuer } from '../../../sql/sqlClient';
import { verifyToken } from '../../../utils/middleware';
import { hasRole, createApiErrorMessage } from '../../../utils';
import { roles, errorCodes } from '../../../constants';
import formidable from 'formidable';

const readFile = promisify(fs.readFile);

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

    let body;
    try {
      const form = formidable({ multiples: true });
      body = await new Promise((resolve, reject) => {
        form.parse(req, (error, fields, files) => {
          if (error) {
            return reject(error);
          }
          resolve({ fields, files });
        });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }

    let file;
    try {
      if (body.files.image) {
        file = await readFile(body.files.image.path, 'base64');
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }

    try {
      await Opportunity.create({
        beginDate: body.fields.startDate,
        category: Number(body.fields.domain) || 0,
        contact: body.fields.email,
        difficulty: Number(body.fields.level) || 0,
        endDate: body.fields.endDate,
        issuerId: issuer.id,
        longDescription: body.fields.description,
        // shortDescription: body.fields.shortDescription,
        // moreInfo: body.fields.moreInfo,
        title: body.fields.title,
        expectations: body.fields.expectations,
        website: body.fields.website,
        addressCity: body.fields.city,
        ...(!!body.fields.number && { addressHousenumber: Number(body.fields.number) || 1 }),
        ...(!!body.fields.postal && { addressPostalcode: Number(body.fields.postal) || 1000 }),
        addressStreet: body.fields.street,
        addressLatitude: body.fields.addressLatitude,
        addressLongitude: body.fields.addressLongitude,
        oppImage: file
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }
    return res.status(204).end();
  }
  return res.status(404).end();
}

export const config = {
  api: {
    bodyParser: false
  }
}
