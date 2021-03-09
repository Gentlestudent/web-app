const getReadableDate = (timestamp) => {
  const months = [
    'januari',
    'februari',
    'maart',
    'april',
    'mei',
    'juni',
    'juli',
    'augustus',
    'september',
    'oktober',
    'november',
    'december'
  ];

  const date = timestamp.toDate();
  const today = new Date();
  const seconds = Math.abs(today - date) / 1000;
  const days = Math.floor(seconds / 86400);

  if (days < 1) {
    return `${date.getHours()}:${date.getMinutes() < 10 ? 0 : ''}${date.getMinutes()}`;
  }
  if (days < 7) {
    return `${days} dag${days > 1 ? 'en' : ''} geleden`;
  }
  return `${date.getDate()} ${months[date.getMonth()]}`;
};

const opportunityConverter = {
  toFirestore(values) {
    const opportunity = {
      addressId: 'TODO',
      authority: 0, // TODO
      badgeId: 'TODO',
      beaconId: 'TODO',
      beginDate: 'TODO',
      category: 0, // TODO
      difficulty: 0, // LEVEL - data is already there
      endDate: 'TODO',
      international: false,
      issuerId: 'TODO',
      longDescription: values.description,
      moreInfo: 'TODO',
      oppImageUrl: 'TODO',
      participations: 0,
      pinImageUrl: 'TODO',
      shortDescription: values.expectations, // I think this is this?
      title: values.title
    };

    // Optionals
    if (values.website) {
      opportunity.website = values.website;
    }

    if (values.contact) {
      opportunity.website = values.contact;
    }

    return opportunity;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      title: data.title
      // ...
    };
  }
};

export { getReadableDate, opportunityConverter };
