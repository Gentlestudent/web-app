import { firestore } from './firebase';
import { participantConverter } from '../models/Participant';

const createParticipant = (id, data) => {
  return;
  // return firestore.collection('Participants').doc(id).set(data)
};

const getParticipantById = async (id) => {
  return {};
  // return (
  //   await firestore.collection('Participants').doc(id).withConverter(participantConverter).get()
  // ).data();
};

const updateParticipant = async (id, data) => {
  return;
  // return firestore.collection('Participants').doc(id).update(data);
}

export { createParticipant, updateParticipant, getParticipantById };
