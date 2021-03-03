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

export { getReadableDate };
