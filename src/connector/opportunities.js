async function getKy() {
  const { default: ky } = await import('ky'); // read here why this instead of importing on line 1 -> https://github.com/sindresorhus/ky/issues/322
  return ky;
}

const addOpportunity = async (opportunity) => {
  const ky = await getKy();
  return ky.post('/api/opportunity', {
    json: opportunity
  });
};

const getOpportunities = async () => {
  const ky = await getKy();
  return ky.get('/api/opportunity');
};

const getOpportunityById = async (id) => {
  const ky = await getKy();
  const { getFirebaseToken } = await import('../utils/firebase');
  return ky.get(`/api/opportunity/${id}`, {
    headers: {
      token: await getFirebaseToken()
    }
  });
};

export { getOpportunities, getOpportunityById, addOpportunity };
