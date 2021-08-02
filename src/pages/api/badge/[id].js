import getSqlClient from '../../../sql/sqlClient';
import { buildBadge } from '../../../badges';

export default async function handler(req, res) {
  const { id } = req.query;
  const { Badge } = await getSqlClient();
  try {
    const badge = await Badge.findOne({
      where: { id }
    });
    if (!badge) {
      return res.status(404).end();
    }
    return res.json(await buildBadge(badge));
  } catch (error) {
    console.error(error);
    return res.status(500).end('ERROR_GETTING_BADGE');
  }
}
