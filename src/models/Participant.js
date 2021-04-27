export class Participant {
  constructor(participant) {
    this.email = participant.email;
    this.institute = participant.institute;
    this.profilePicture = participant.profilePicture;
    this.lastName = participant.lastName;
    this.firstName = participant.firstName;
    this.name = participant.name;
    this.notifApp = participant.notifApp;
    this.notifEmail = participant.notifEmail;
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
      name: participant.name,
      lastName: participant.lastName,
      firstName: participant.firstName,
      notifApp: participant.notifApp,
      notifEmail: participant.notifEmail
    };
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new Participant({ ...data, id: snapshot.id });
  }
};
