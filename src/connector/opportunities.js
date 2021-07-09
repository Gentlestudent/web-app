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

const getOpportunities = async ({ searchParams } = {}) => {
  const ky = await getKy();
  if (searchParams) {
    searchParams =
      searchParams instanceof window.URLSearchParams
        ? searchParams
        : new window.URLSearchParams(searchParams);
    return ky.get(`/api/opportunity?${searchParams.toString()}`);
  }
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

async function approveOpportunity(id) {
  const ky = await getKy();
  const searchParams = new window.URLSearchParams({ id })
  return ky.get(`/api/opportunity/approve?${searchParams.toString()}`);
}

async function denyOpportunity(id) {
  const ky = await getKy();
  const searchParams = new window.URLSearchParams({ id })
  return ky.get(`/api/opportunity/deny?${searchParams.toString()}`);
}

export { getOpportunities, getOpportunityById, addOpportunity, approveOpportunity, denyOpportunity };
