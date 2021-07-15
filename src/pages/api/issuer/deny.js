import { Issuer } from '../../../sql/sqlClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const issuerId = req.query.id;
    if (!issuerId) {
      return req.status(400).end('MISSING_ISSUER_ID');
    }

    try {
      await Issuer.destroy({
        where: {
          id: issuerId
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).end('ERROR_DENYING_ISSUER');
    }
    return res.send('ok');
  }
  return res.status(404).end();
}
