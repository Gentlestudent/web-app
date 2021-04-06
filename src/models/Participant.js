export class Participant {
  constructor(participant) {
    this.email = participant.email;
    this.institute = participant.institute;
    this.profilePicture = participant.profilePicture;
    this.name = participant.name;
  }
}

export const participantConverter = {
  /**
   *
   * @param {Participant} participant
   * @returns
   */
  toFirestore(participant) {
    return {
      email: participant.email,
      institute: participant.institute,
      profilePicture: participant.profilePicture,
      name: participant.name
    };
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new Participant({ ...data, id: snapshot.id });
  }
};
