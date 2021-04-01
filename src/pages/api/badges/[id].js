import { getBadge } from '../../../api/functions';

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const badge = await getBadge(id);
    return res.status(200).json(badge);
  } catch (e) {
    if (e.code === 'not-found') return res.status(404).end();
    return res.status(500).end();
  }
}
