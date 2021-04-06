import { getIssuer } from '../../../api/functions';

export default async function handler(req, res) {
  try {
    const { data } = await getIssuer({});
    return res.status(200).json(data);
  } catch (e) {
    if (e.code === 'not-found') return res.status(404).end();
    return res.status(500).end();
  }
}
