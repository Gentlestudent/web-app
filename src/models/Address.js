export default class Address {
  constructor(address) {
    this.bus = address.bus;
    this.city = address.city;
    this.country = address.country;
    this.housenumber = address.housenumber;
    this.latitude = address.latitude;
    this.longitude = address.longitude;
    this.postalcode = address.postalcode;
    this.street = address.street;
    this.id = address.id;
  }
}

export const addressConverter = {
  /**
   *
   * @param {Address} address
   * @returns
   */
  toFirestore(address) {
    return {
      city: address.city,
      country: address.country,
      housenumber: address.housenumber,
      latitude: address.latitude,
      longitude: address.longitude,
      postalcode: address.postalcode,
      street: address.street,
      bus: address.bus
    };
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new Address({ ...data, id: snapshot.id });
  }
};
