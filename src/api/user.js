import { firestore } from './firebase';
import { participantConverter, issuerConverter } from '../models/User';

/**
 * Retrieves the profile data of the user whose id matches the parameter
 * @param {*} id
 * @returns
 */
export const getProfile = async (id) => {
  const profile = {};
  profile.role = {};

  // get data from participant
  const participant = await firestore
    .collection('Participants')
    .doc(id)
    .withConverter(participantConverter)
    .get();
  if (participant.exists) {
    profile.role.participant = true;
    profile.participant = participant.data();
  }

  // get data from issuer
  const issuer = await firestore.collection('Issuers').doc(id).withConverter(issuerConverter).get();
  if (issuer.exists) {
    profile.role.issuer = true;
    profile.issuer = issuer.data();
  }
  // get data from admin
  const admin = await firestore.collection('Admins').doc(id).get();
  if (admin.exists) {
    profile.role.admin = true;
  }

  return profile;
};
