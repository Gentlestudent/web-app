import { getAuthenticatedKy, getPublicKy } from '../utils/getKy';

const addNews = async (news) => {
  const ky = await getAuthenticatedKy();
  return ky.post('/api/news', {
    json: news
  });
};

const getNews = async () => {
  const ky = await getPublicKy();
  return ky.get('/api/news');
};

const getNewsById = async (id) => {
  const ky = await getPublicKy();
  return ky.get(`/api/news/${id}`);
};

export { getNews, getNewsById, addNews };
