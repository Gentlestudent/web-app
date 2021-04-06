import { firestore } from './firebase';
import { issuerConverter } from '../models/Issuer';

export const getIssuerById = async (id) => {
  return (
    await firestore.collection('Issuers').doc(id).withConverter(issuerConverter).get()
  ).data();
};
