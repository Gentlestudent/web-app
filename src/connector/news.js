async function getKy() {
  const { default: ky } = await import('ky'); // read here why this instead of importing on line 1 -> https://github.com/sindresorhus/ky/issues/322
  return ky;
}

const addNews = async (news) => {
  const ky = await getKy();
  return ky.post('/api/news', {
    json: news
  });
};

const getNews = async () => {
  const ky = await getKy();
  return ky.get('/api/news');
};

const getNewsById = async (id) => {
  const ky = await getKy();
  return ky.get(`/api/news/${id}`);
};

export { getNews, getNewsById, addNews };
