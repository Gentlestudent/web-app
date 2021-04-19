import { Heading, Button } from '../../components/UI';
import { colors, spacers, breakpoints } from '../../assets/styles/constants';
import { Container } from '../../components/layout/index';
import banner from '../../assets/img/home/banner.jpg';
import { routes } from '../../constants';

export default function News() {
  return (
    <>
      <div className="news-wrapper">
        <Container>
          <div className="news-content">
            <div className="article">
              <Button href={routes.NEWS} text="Terug naar overzicht" icon="arrow-left" reverse />
              <Heading title="Titel van artikel komt hier terecht" level={1} />
              <div className="article-info">
                <p>2018-05-25 | Lore Demedts</p>
              </div>
              <p className="article-text">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
                numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
                suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
                vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
              </p>
              <p className="article-text">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                voluptatem quia voluptas.
              </p>
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
            background: url(${banner});
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
