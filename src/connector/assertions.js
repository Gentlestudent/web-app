async function getKy() {
  const { default: ky } = await import('ky'); // read here why this instead of importing on line 1 -> https://github.com/sindresorhus/ky/issues/322
  return ky;
}

const getAssertions = async ({ searchParams } = {}) => {
  const ky = await getKy();
  if (searchParams) {
    searchParams =
      searchParams instanceof window.URLSearchParams
        ? searchParams
        : new window.URLSearchParams(searchParams);
    return ky.get(`/api/assertion?${searchParams.toString()}`);
  }
  return ky.get('/api/assertion');
};

export { getAssertions };
