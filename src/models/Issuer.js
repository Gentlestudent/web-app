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
    return new Issuer({ ...data, id: snapshot.id });
  }
};
