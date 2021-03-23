import Router from 'next/router';
import { Container } from '../../components/layout/index';
import { Card, Heading } from '../../components/UI';
import { routes } from '../../constants';
import { getOpportunities } from '../../api/opportunities';
import { getReadableDate } from '../../utils/index';
import { spacers, colors, breakpoints } from '../../assets/styles/constants';

const MyOpportunities = ({ opportunities }) => {
  return (
    <>
      <Container>
        <>
          <Heading title="Leerkansen" level={1} marginTop />
          <article className="cards">
            {opportunities.map((opp) => (
              <Card
                onClick={() => Router.push(`${routes.OPPORTUNITIES}/${opp.id}`)}
                key={opp.id}
                badge={opp.badge}
                image="https://picsum.photos/200/300"
                title={opp.title}
                description={opp.shortDescription}
                date={opp.date}
                alt={opp.alt ? opp.alt : opp.title}
              />
            ))}
          </article>
        </>
      </Container>
      <style jsx>
        {`
          .cards {
            display: grid;
            grid-template: auto / repeat(3, 1fr);
            grid-gap: ${spacers.medium};
            margin: ${spacers.medium} 0 6rem;
          }

          .heading {
            display: flex;
            justify-content: space-between;
            margin: 3rem 0 0;
          }

          .map-wrapper {
            background: ${colors.blueLight};
            height: 50rem;
          }

          @media (max-width: ${breakpoints.medium}) {
            .cards {
              grid-template: 1fr 1fr / repeat(2, 1fr);
            }

            .heading {
              flex-direction: column;
              margin-bottom: 2rem;
              align-items: start;
            }
          }

          @media (max-width: ${breakpoints.small}) {
            .cards {
              grid-gap: ${spacers.small};
            }
          }

          @media (max-width: ${breakpoints.extraSmall}) {
            .cards {
              grid-template: 1fr 1fr / repeat(1, 1fr);
            }
          }
        `}
      </style>
    </>
  );
};

export const getStaticProps = async () => {
  // Would be better if getOpportunities would be called somewhere globally (still as SSR data)
  const opportunitiesFromDb = await getOpportunities();
  const opportunities = opportunitiesFromDb.map((opp) => {
    opp.beginDate = getReadableDate(opp.beginDate);
    opp.endDate = getReadableDate(opp.endDate);
    return opp;
  });

  return {
    props: { opportunities }
    // revalidate: 900
  };
};

export default MyOpportunities;
