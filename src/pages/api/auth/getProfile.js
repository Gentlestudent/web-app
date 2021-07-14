import { User, Issuer } from '../../../sql/sqlClient';

export default async function handler(req, res) {
  const { id } = req.query;
  const user = await User.findOne({ where: { firebaseUid: id } });
  const issuer = await Issuer.findOne({ where: { userId: user.id } });
  return res.json({
    ...user?.toJSON(),
    issuer: issuer?.toJSON()
  });
}
