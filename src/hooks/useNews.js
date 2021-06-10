import { useState, useEffect } from 'react';
import { getNews } from '../connector/news';

function useNews(initialNews = []) {
  const [news, setNews] = useState(initialNews);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const news = await (await getNews()).json();
        setNews(news);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return [error, loading, news];
}

export default useNews;
