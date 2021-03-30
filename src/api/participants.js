import { firestore } from './firebase';
import { participantConverter } from '../models/Participant';

const createParticipant = (id, data) => firestore.collection('Participants').doc(id).set(data);

const getParticipantById = async (id) => {
  return (
    await firestore.collection('Participants').doc(id).withConverter(participantConverter).get()
  ).data();
};

const updateParticipant = async (id, data) =>
  firestore.collection('Participants').doc(id).update(data);

export { createParticipant, updateParticipant, getParticipantById };
