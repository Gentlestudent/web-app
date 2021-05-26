import { firestore } from './firebase';
import { addressConverter } from '../models/Address';

export const addAddress = (address) => {
  return;
  // return firestore.collection('Addresses').withConverter(addressConverter).add(address);
};

export const getAddressById = async (id) => {
  return {};
  // return (
  //   await firestore.collection('Addresses').doc(id).withConverter(addressConverter).get()
  // ).data();
};
