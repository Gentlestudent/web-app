import PropTypes from 'prop-types';
import Heading from './heading';
import Button from './button';
import { colors } from '../../assets/styles/constants';
import { getFullDate } from '../../utils';

const News = ({ news = [] }) => {
  return (
    <>
      <article className="news">
        <div className="news-text">
          <Heading level={2} title="Nieuws" />
          <p>Zie wat Gentlestudent heeft te bieden en wat je mag verwachten in de toekomst</p>
          <Button text="Wat is er nieuw?" icon="arrow-right" href="/news" />
        </div>
        <div className="others">
          <div className="header">
            <Heading title="Lees meer" level={2} />
          </div>
          <ul className="news-list">
            {news.map((newsItem) => {
              return (
                <li key={newsItem.id} className="news-item">
                  <a href={`/news/${newsItem.id}`}>
                    <p className="date">{getFullDate(newsItem.published)}</p>
                    <p className="title">{newsItem.title}</p>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </article>

      <style jsx>
        {`
          .news {
            margin-top: 10rem;
            display: flex;
            // align-items: center;
          }

          .news-text {
            max-width: 40rem;
            padding-right: 8rem;
          }

          .others {
            i
          }

          .news-item {
            padding: 1.5rem 0;
            background-image: linear-gradient(90deg, #000 33%, hsla(0, 0%, 100%, 0) 0);
            background-position: 0 bottom;
            background-size: 3px 1px;
            background-repeat: repeat-x;
          }

          .news-item .date {
            color: ${colors.orange};
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0;
          }

          .news-item .title {
            margin: 0;
            padding: 0.5rem 0 0;
            color: black;
          }

          .news-item a {
            text-decoration: none;
          }

          .others .header {
            margin-bottom: 1.5rem;
          }
        `}
      </style>
    </>
  );
};

News.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object)
};

export default News;
