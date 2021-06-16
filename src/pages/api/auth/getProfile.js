import { User } from '../../../sql/sqlClient';
// import Issuer from '../../../sql/models/issuer';
// import Admin from '../../../sql/models/admin';

export default async function handler(req, res) {
  const profile = {};
  profile.role = {};

  const { id } = req.query;

  // get data from participant
  const participant = await User.findOne({ where: { firebaseUid: id } });
  if (participant) {
    profile.role.participant = true;
    profile.participant = participant;
  }

  // // get data from issuer
  // const issuer = await getIssuerById(id);
  // if (issuer) {
  //   profile.role.issuer = true;
  //   profile.issuer = issuer;
  // }

  // // get data from admin
  // const admin = await firestore.collection('Admins').doc(id).get();
  // if (admin.exists) {
  //   profile.role.admin = true;
  // }

  return res.json(profile);
}
