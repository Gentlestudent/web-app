import { User } from '../../../sql/sqlClient';

export default async function handler(req, res) {
  const { id } = req.query;
  return res.json(await User.findOne({ where: { firebaseUid: id } }));
}
