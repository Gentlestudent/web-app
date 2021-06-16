import { useRouter } from 'next/router';
import { Heading, Button } from '../../components/UI';
import { colors, spacers, breakpoints } from '../../assets/styles/constants';
import { Container } from '../../components/layout/index';
import banner from '../../assets/img/home/banner.jpg';
import { routes } from '../../constants';
import { useNewsItem } from '../../hooks';

export default function News() {
  const router = useRouter();
  const [errorNews, loadingNews, news] = useNewsItem(router.query.id || null, {});
  // TODO handle error & show loading

  return (
    <>
      <div className="news-wrapper">
        <Container>
          <div className="news-content">
            <div className="article">
              <Button href={routes.NEWS} text="Terug naar overzicht" icon="arrow-left" reverse />
              <Heading title={news.title} level={1} />
              <div className="article-info">
                <p>{`${news.published} | ${news.author}`}</p>
              </div>
              <p className="article-text">{news.longText}</p>
            </div>
            <div className="others">
              <div className="header">
                <Heading title="Lees meer" level={2} />
              </div>
              <ul className="news-list">
                <li className="news-item">
                  <div>
                    <p className="date">15/09/2020</p>
                    <p className="title">Dit was Startevent 2020: verhalen met een hart</p>
                  </div>
                </li>
                <li className="news-item">
                  <div>
                    <p className="date">15/09/2020</p>
                    <p className="title">Dit was Startevent 2020: verhalen met een hart</p>
                  </div>
                </li>
                <li className="news-item">
                  <div>
                    <p className="date">15/09/2020</p>
                    <p className="title">Dit was Startevent 2020: verhalen met een hart</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
      <style jsx>
        {`
          .news-wrapper {
            position: relative;
          }

          .news-wrapper::before {
            background: url(${news.imageUrl || banner});
            background-repeat: no-repeat;
            background-size: cover;
            content: '';
            position: absolute;
            height: 50rem;
            width: 100%;
            z-index: -1;
            left: 0;
          }

          .news-content {
            margin-top: 25rem;
            display: grid;
            grid-template-columns: 3fr 2fr;
            grid-gap: ${spacers.large};
          }

          .article {
            background: ${colors.blueLight};
            padding: ${spacers.large};
          }

          .article-info {
            transform: translateY(-2rem);
            text-transform: uppercase;
            font-size: 1.5rem;
            font-weight: 600;
            color: ${colors.orange};
          }

          .article-text {
            margin-top: 4rem;
          }

          .others {
            margin-top: 30rem;
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
          }

          .others .header {
            margin-bottom: 1.5rem;
          }

          @media (max-width: ${breakpoints.medium}) {
            .news-content {
              grid-template-columns: 2fr 1fr;
            }
          }

          @media (max-width: 1080px) {
            .others {
              margin-top: 0;
            }
            .news-content {
              grid-template-columns: 1fr;
            }

            .article {
              padding: ${spacers.medium};
            }
          }

          @media (max-width: ${breakpoints.extraSmall}) {
            .news-wrapper::before {
              height: 23rem;
            }

            .article {
              background: none;
              padding: 0;
            }

            .article-text {
              margin-top: 1rem;
            }
          }
        `}
      </style>
    </>
  );
}
