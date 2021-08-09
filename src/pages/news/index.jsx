import Router from 'next/router';
import { Container } from '../../components/layout/index';
import { spacers } from '../../assets/styles/constants';
import { Card, Heading, LoadingSpinner } from '../../components/UI';
import { routes } from '../../constants';
import { useNews, useErrorNotifier } from '../../hooks';

export default function News() {
  const [errorNews, loadingNews, news] = useNews();

  useErrorNotifier([errorNews]);

  return (
    <>
      <Container>
        <Heading title="Nieuws" level={1} marginTop />
        <article className="news-items">
          {loadingNews && <LoadingSpinner />}
          {(news?.data || []).map((newsItem) => (
            <Card
              onClick={() => Router.push(`${routes.NEWS}/${newsItem.id}`)}
              key={newsItem.id}
              id={newsItem.id}
              image={newsItem.imageUrl}
              title={newsItem.title}
              description={newsItem.shortText}
              date={newsItem.published}
              alt={newsItem.alt ? newsItem.alt : newsItem.title}
              row
              url={`${routes.NEWS}/${newsItem.id}`}
            />
          ))}
        </article>
      </Container>
      <style jsx>
        {`
          .heading {
            display: flex;
            justify-content: space-between;
            margin: 3rem 0 0;
          }

          .news-items > * {
            display: flex;
            flex-direction: column;
            margin-bottom: 2rem;
            // margin: ${spacers.medium} 0 6rem;
          }
        `}
      </style>
    </>
  );
}
