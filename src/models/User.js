/* eslint-disable max-classes-per-file */
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
    return new Participant(data);
  }
};

export class Issuer {
  constructor(issuer) {
    this.email = issuer.email;
    this.institution = issuer.institution;
    this.url = issuer.url;
    this.name = issuer.name;
    this.phonenumber = issuer.phonenumber;
    this.validated = issuer.validated;
    this.addressID = issuer.addressID; // TODO normalize this field
  }
}

export const issuerConverter = {
  /**
   *
   * @param {Issuer} participant
   * @returns
   */
  toFirestore(issuer) {
    return {
      email: issuer.email,
      institution: issuer.institution,
      url: issuer.url,
      name: issuer.name,
      phonenumber: issuer.phonenumber,
      addressID: issuer.addressID
    };
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new Issuer(data);
  }
};

class User {
  constructor(user) {
    this.id = user.uid;
    this.email = user.email;
    this.isVerified = user.emailVerified;
  }
}

export default User;
