import fs from 'fs';
import { promisify } from 'util';
import { Op } from 'sequelize';
import getSqlClient from '../../../sql/sqlClient';
import { verifyToken } from '../../../utils/middleware';
import { hasRole, createApiErrorMessage } from '../../../utils';
import { roles, errorCodes, categoryValues, categoryLabels } from '../../../constants';
import formidable from 'formidable';

const readFile = promisify(fs.readFile);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { Opportunity, Issuer, User } = await getSqlClient();
    try {
      // convert search string into category value so we can match it on the db
      const searchCategory = categoryValues[(Object.entries(categoryLabels).find(([, label]) => label.toLowerCase() === (req.query.search || '').toLowerCase()) || [])[0]];
      const options = {
        where: {
          [Op.and]: [
            { authority: req.query.authority ? req.query.authority.split(',') : 1 },
            req.query.issuer ? { issuerId: req.query.issuer } : null,
            req.query.search
              ? {
                  [Op.or]: [
                    { title: { [Op.like]: `%${req.query.search}%` } },
                    { addressCity: { [Op.like]: `%${req.query.search}%` } },
                    { addressStreet: { [Op.like]: `%${req.query.search}%` } },
                    searchCategory >= 0 ? { category: searchCategory } : null
                  ]
                }
              : null,
            req.query.region ? { region: req.query.region } : null
          ]
        },
        limit: Number(req.query.limit || 100),
        offset: (Number(req.query.page - 1) * Number(req.query.limit || 100)) || 0,
        order: [['beginDate', 'DESC']]
      };

      // order
      if (req.query.sort) {
        const descending = req.query.sort[0] === '-';
        const order = descending ? req.query.sort.slice(1) : req.query.sort;

        const validOrderValues = new Set(['title', 'beginDate', 'endDate', 'institute', 'authority']);

        if (validOrderValues.has(order)) {
          options.order = [
            [
              order,
              descending ? 'DESC' : 'ASC'
            ]
          ];

          if (order === 'institute') {
            options.order[0].unshift({ model: Issuer, as: 'issuer' });
          }
        }
      }

      const include = [];
      if (req.query.includeIssuers === 'true') {
        include.push({
          model: Issuer,
          as: 'issuer',
          include: {
            model: User,
            as: 'user',
            attributes: {
              exclude: ['password', 'emailVerificationId', 'sessionId']
            }
          }
        });
      }
      const [count, opportunities] = await Promise.all([
        Opportunity.count({ where: options.where }),
        Opportunity.findAll({
          ...options,
          include
        })
      ]);
      return res.json({
        data: opportunities,
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

    if (!authenticated || !hasRole(user, roles.ISSUER)) {
      return res.status(401).end();
    }

    const { Opportunity, Issuer } = await getSqlClient();

    let issuer;
    try {
      issuer = await Issuer.findOne({
        where: { userId: user.id },
        attributes: ['id']
      })
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }

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

    // TODO enforce required fields
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
        region: body.fields.region,
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
