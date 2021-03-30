import { firestore, auth } from './firebase';
import { getParticipantById } from './participants';
import { getIssuerById } from './issuers';

/**
 * Retrieves the profile data of the user whose id matches the parameter
 * @param {*} id
 * @returns
 */
export const getProfile = async (id) => {
  const profile = {};
  profile.role = {};

  // get data from participant
  const participant = await getParticipantById(id);
  if (participant) {
    profile.role.participant = true;
    profile.participant = participant;
  }

  // get data from issuer
  const issuer = await getIssuerById(id);
  if (issuer) {
    profile.role.issuer = true;
    profile.issuer = issuer;
  }
  // get data from admin
  const admin = await firestore.collection('Admins').doc(id).get();
  if (admin.exists) {
    profile.role.admin = true;
  }

  return profile;
};

export const updateProfile = async ({ email, name, password }) => {
  const user = auth.currentUser;
  if (!user) return;

  const newEmail = user.email === email ? null : email;

  if (newEmail || password) {
    if (newEmail) {
      await user.updateEmail(newEmail);
    }

    if (password) {
      await user.updatePassword(password);
    }
  }

  if (user.displayName !== name) await user.updateProfile({ displayName: name });
};
